from flask import g, jsonify, abort, request

from app.db.connection import new_connection_cursor
from ..auth import is_authenticated
from .blueprint import bp_admin


@bp_admin.route('/dashboard/cards', methods=['GET'])
def handle_get_cards():
    if not is_authenticated():
        return abort(401)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("""
            SELECT cards.*
            FROM cards
            INNER JOIN tokens ON cards.token_id = tokens.id
            INNER JOIN banks ON cards.bank_id = banks.id
            ORDER BY cards.token_id""")
            rows = cursor.fetchall()

        cards = [
            {
                "id": row['id'],
                "external_id": row['external_id'],
                "token_id": row['token_id'],
                "bank_id": row['bank_id'],
                "card_number": row['card_number'],
                "phone_number": row['phone_number'],
                "account_number": row['account_number'],
                "hidden": bool(row['hidden']),
            } for row in rows
        ]

        return jsonify(cards)
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/cards', methods=['DELETE'])
def handle_delete_card():
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.get_json()
    card_id = data.get('id')
    token_id = data.get('token_id')
    if not card_id and not token_id:
        return abort(400)

    try:
        with new_connection_cursor(g.db) as cursor:
            if card_id:
                cursor.execute("DELETE FROM cards WHERE id = ?", (card_id,))
            elif token_id:
                cursor.execute("DELETE FROM cards WHERE token_id = ?", (token_id,))
            g.db.commit()

        return jsonify({'status': 'success', 'message': 'Карты успешно удалены'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500
