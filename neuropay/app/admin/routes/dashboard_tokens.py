from flask import g, jsonify, abort, request

from app.db.connection import new_connection_cursor
from ..auth import is_authenticated
from .blueprint import bp_admin


@bp_admin.route('/dashboard/tokens', methods=['GET'])
def handle_get_tokens():
    if not is_authenticated():
        return abort(401)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute(
                "SELECT tokens.* FROM tokens INNER JOIN wallets ON tokens.wallet_id = wallets.id ORDER BY tokens.is_deactivated, tokens.id")
            rows = cursor.fetchall()

        tokens = [
            {
                "id": row['id'],
                "wallet_id": row['wallet_id'],
                "token": row['token'],
                "security_deposit": row['security_deposit'],
                "working_deposit": row['working_deposit'],
                "frozen_deposit": row['frozen_deposit'],
                "rate": row['rate'],
                "currency": row['currency']
            } for row in rows
        ]

        return jsonify(tokens)
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/tokens', methods=['POST'])
def handle_create_token():
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.get_json()

    wallet_id = data.get('wallet_id')
    token = data.get('token')
    security_deposit = data.get('security_deposit')
    working_deposit = data.get('working_deposit')
    frozen_deposit = data.get('frozen_deposit')
    rate = data.get('rate')
    currency = data.get('currency')

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("SELECT id FROM wallets WHERE id = ?", (wallet_id,))
            wallet_row = cursor.fetchone()
            if not wallet_row:
                return jsonify({'status': 'error', 'message': 'Кошелек не найден'}), 404

            cursor.execute("SELECT id FROM tokens WHERE token = ?", (token,))
            token_row = cursor.fetchone()
            if token_row:
                return jsonify({'status': 'error', 'message': 'Токен уже существует'})

            cursor.execute(
                "INSERT INTO tokens (wallet_id, token, security_deposit, working_deposit, frozen_deposit, rate, currency) VALUES (?, ?, ?, ?, ?, ?, ?)",
                (wallet_id, token, security_deposit, working_deposit, frozen_deposit, rate, currency))
            g.db.commit()

        return jsonify({
            'status': 'success',
            'message': 'Токен добавлен',
        })
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/tokens/<int:token_id>', methods=['PUT'])
def handle_update_token(token_id):
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.get_json()

    wallet_id = data.get('wallet_id')
    token = data.get('token')
    security_deposit = data.get('security_deposit')
    working_deposit = data.get('working_deposit')
    frozen_deposit = data.get('frozen_deposit')
    rate = data.get('rate')
    currency = data.get('currency')

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("SELECT id FROM wallets WHERE id = ?", (wallet_id,))
            wallet_row = cursor.fetchone()
            if not wallet_row:
                return jsonify({'status': 'error', 'message': 'Кошелек не найден'}), 404

            cursor.execute("SELECT id FROM tokens WHERE token = ? AND id <> ?", (token, token_id))
            token_row = cursor.fetchone()
            if token_row:
                return jsonify({'status': 'error', 'message': 'Токен уже существует'})

            cursor.execute("SELECT id FROM tokens WHERE id = ?", (token_id,))
            token_row = cursor.fetchone()
            if not token_row:
                return jsonify({'status': 'error', 'message': 'Токен не найден'}), 404

            cursor.execute(
                "UPDATE tokens SET wallet_id = ?, token = ?, security_deposit = ?, working_deposit = ?, frozen_deposit = ?, rate = ?, currency = ? WHERE id = ?",
                (wallet_id, token, security_deposit, working_deposit, frozen_deposit, rate, currency, token_id))
            g.db.commit()

        return jsonify({
            'status': 'success',
            'message': 'Токен обновлен',
        })
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/tokens/<int:token_id>', methods=['DELETE'])
def handle_delete_token(token_id):
    if not is_authenticated():
        return abort(401)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("DELETE FROM users WHERE token_id = ?", (token_id,))
            cursor.execute("DELETE FROM cards WHERE token_id = ?", (token_id,))
            cursor.execute("DELETE FROM token_banks WHERE token_id = ?", (token_id,))
            cursor.execute("DELETE FROM token_contents WHERE token_id = ?", (token_id,))
            cursor.execute("DELETE FROM kpi_statistics WHERE token_id = ?", (token_id,))

            cursor.execute("DELETE FROM tokens WHERE id = ?", (token_id,))
            g.db.commit()

        return jsonify({
            'status': 'success',
            'message': 'Токен удален',
        })
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500
