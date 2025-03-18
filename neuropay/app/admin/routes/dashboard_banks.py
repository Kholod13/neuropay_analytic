from flask import g, abort, jsonify, request

from app.db.connection import new_connection_cursor
from app.db.bank_repository import get_or_create_bank
from .blueprint import bp_admin
from ..auth import is_authenticated


@bp_admin.route('/dashboard/banks', methods=['GET'])
def handle_get_token_banks():
    if not is_authenticated():
        return abort(401)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute(
                """SELECT token_banks.id, token_banks.token_id, token_banks.sort_order, banks.id AS bank_id
                FROM token_banks
                INNER JOIN banks ON token_banks.bank_id = banks.id
                LEFT JOIN tokens ON token_banks.token_id = tokens.id
                WHERE token_banks.token_id IS NULL OR (token_banks.token_id IS NOT NULL AND tokens.is_deactivated = 0)
                ORDER BY token_banks.token_id, token_banks.sort_order, token_banks.id"""
            )
            rows = cursor.fetchall()

        banks = [
            {
                "id": row['id'],
                "token_id": row['token_id'],
                "bank_id": row['bank_id'],
                "sort_order": row['sort_order']
            } for row in rows
        ]

        return jsonify(banks)
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/banks', methods=['POST'])
def handle_create_token_bank():
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.get_json()
    name = data.get('name')
    if not name:
        return jsonify({'status': 'error', 'message': 'Не переданы необходимые данные'}), 400
    name = name.strip()

    token_id = data.get('token_id')
    sort_order = int(data.get('sort_order', 100))

    try:
        with new_connection_cursor(g.db) as cursor:
            bank = get_or_create_bank(g.db, name)

            token_id_where_clause = "token_id IS NULL"
            where_clause_parameters = [bank['id']]
            if token_id:
                token_id_where_clause = "token_id = ?"
                where_clause_parameters.append(token_id)

            cursor.execute(
                f"SELECT id FROM token_banks WHERE bank_id = ? AND {token_id_where_clause}",
                where_clause_parameters
            )
            row = cursor.fetchone()

            if row:
                cursor.execute("UPDATE token_banks SET sort_order = ? WHERE id = ?", (sort_order, row['id']))
            else:
                cursor.execute("INSERT INTO token_banks (token_id, bank_id, sort_order) VALUES (?, ?, ?)",
                               (token_id, bank['id'], sort_order))
            g.db.commit()

        return jsonify({'status': 'success', 'message': 'Банк добавлен'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/banks/<int:token_bank_id>', methods=['PUT'])
def handle_update_token_bank(token_bank_id):
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.get_json()
    name = data.get('name')
    if not name:
        return jsonify({'status': 'error', 'message': 'Не переданы необходимые данные'}), 400
    name = name.strip()

    sort_order = int(data.get('sort_order', 100))

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("SELECT token_id FROM token_banks WHERE id = ?", (token_bank_id,))
            row = cursor.fetchone()

            if not row:
                return jsonify({'status': 'error', 'message': 'Банк не найден'}), 404

            bank = get_or_create_bank(g.db, name)

            token_id = row['token_id']
            token_id_where_clause = "token_id IS NULL"
            token_id_where_clause_parameters = []
            if token_id:
                token_id_where_clause = "token_id = ?"
                token_id_where_clause_parameters.append(token_id)

            cursor.execute(f"SELECT id FROM token_banks WHERE id <> ? AND bank_id = ? AND {token_id_where_clause}",
                           (token_bank_id, bank['id'], *token_id_where_clause_parameters))
            duplicate = cursor.fetchone()
            if duplicate:
                cursor.execute("DELETE FROM token_banks WHERE id = ?", (duplicate['id'],))

            cursor.execute("UPDATE token_banks SET bank_id = ?, sort_order = ? WHERE id = ?",
                           (bank['id'], sort_order, token_bank_id))
            g.db.commit()

        return jsonify({'status': 'success', 'message': 'Банк обновлен'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/banks/<int:token_bank_id>', methods=['DELETE'])
def handle_delete_token_bank(token_bank_id):
    if not is_authenticated():
        return abort(401)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("SELECT bank_id FROM token_banks WHERE id = ?", (token_bank_id,))
            row = cursor.fetchone()

            cursor.execute("DELETE FROM token_banks WHERE id = ?", (token_bank_id,))

            if row:
                cursor.execute("""
                SELECT COUNT(banks.id) AS count
                FROM banks
                LEFT JOIN token_banks ON token_banks.bank_id = banks.id
                LEFT JOIN cards ON cards.bank_id = banks.id
                WHERE banks.id = ? AND (token_banks.id IS NOT NULL OR cards.id IS NOT NULL)
                """,
                               (row['bank_id'],))
                count_row = cursor.fetchone()
                if not count_row['count']:
                    cursor.execute("DELETE FROM banks WHERE id = ?", (row['bank_id'],))

            g.db.commit()

        return jsonify({'status': 'success', 'message': 'Банк удален'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/banks', methods=['DELETE'])
def handle_delete_all_token_banks():
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.get_json()
    token_id = data.get('token_id')
    if not token_id:
        return jsonify({'status': 'error', 'message': 'Не переданы необходимые данные'}), 400

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("DELETE FROM token_banks WHERE token_id = ?", (token_id,))
            g.db.commit()

        return jsonify({'status': 'success', 'message': 'Банки удалены'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500
