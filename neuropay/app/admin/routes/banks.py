from flask import g, abort, jsonify, request

from app.db.connection import new_connection_cursor
from .blueprint import bp_admin
from ..auth import is_authenticated


@bp_admin.route('/banks', methods=['GET'])
def handle_get_banks():
    if not is_authenticated():
        return abort(401)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("SELECT * FROM banks")
            rows = cursor.fetchall()

        banks = [
            {
                "id": row['id'],
                "name": row['name']
            } for row in rows
        ]

        return jsonify(banks)
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500
