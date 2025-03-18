from flask import g, request, jsonify, abort

from app.db.connection import new_connection_cursor
from .blueprint import bp_admin
from ..auth import is_authenticated


@bp_admin.route('/wallets', methods=['GET'])
def handle_get_wallets():
    if not is_authenticated():
        return abort(401)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("SELECT * FROM wallets")
            rows = cursor.fetchall()

        wallets = [
            {
                "id": row['id'],
                "address": row['wallet_address'],
            } for row in rows
        ]

        return jsonify(wallets)
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/wallets', methods=['POST'])
def handle_create_wallet():
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.get_json()
    wallet_address = data.get('address')
    if not wallet_address:
        return jsonify({'status': 'error', 'message': 'Не указан адрес кошелька'}), 400

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("SELECT id FROM wallets WHERE wallet_address = ?", (wallet_address,))
            row = cursor.fetchone()
            if row:
                return jsonify({'status': 'error', 'message': 'Кошелек с таким адресом уже существует'})

            cursor.execute("INSERT INTO wallets (wallet_address) VALUES (?)", (wallet_address,))
            g.db.commit()

        return jsonify({'status': 'success', 'message': 'Кошелек добавлен'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/wallets/<int:wallet_id>', methods=['PUT'])
def handle_update_wallet(wallet_id):
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.get_json()
    wallet_address = data.get('address')
    if not wallet_address:
        return jsonify({'status': 'error', 'message': 'Не указан адрес кошелька'}), 400

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("SELECT id FROM wallets WHERE id = ?", (wallet_id,))
            row = cursor.fetchone()
            if not row:
                return jsonify({'status': 'error', 'message': 'Кошелек не найден'}), 404

            cursor.execute("UPDATE wallets SET wallet_address = ? WHERE id = ?", (wallet_address, wallet_id))
            g.db.commit()

        return jsonify({'status': 'success', 'message': 'Кошелек обновлен'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/wallets/<int:wallet_id>', methods=['DELETE'])
def handle_delete_wallet(wallet_id):
    if not is_authenticated():
        return abort(401)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("SELECT id FROM tokens WHERE wallet_id = ?", (wallet_id,))
            row = cursor.fetchone()
            if row:
                return jsonify({'status': 'error', 'message': 'Нельзя удалить кошелек, к которому привязаны токены'})

            cursor.execute("DELETE FROM wallets WHERE id = ?", (wallet_id,))
            g.db.commit()

        return jsonify({'status': 'success', 'message': 'Кошелек удален'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500
