from flask import g, abort, jsonify, request

from app.db.connection import new_connection_cursor
from .blueprint import bp_admin
from ..auth import is_authenticated


@bp_admin.route('/dashboard/contents', methods=['GET'])
def handle_get_contents():
    if not is_authenticated():
        return abort(401)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("""
            SELECT contents.content_key, token_contents.content_value, contents.description
            FROM contents
            LEFT JOIN token_contents
              ON contents.id = token_contents.content_id AND token_contents.token_id IS NULL
            GROUP BY contents.id
            ORDER BY contents.id
            """)
            default_contents = cursor.fetchall()

            cursor.execute("""
            SELECT contents.content_key, token_contents.token_id, token_contents.content_value
            FROM token_contents
            INNER JOIN contents ON token_contents.content_id = contents.id
            INNER JOIN tokens ON token_contents.token_id = tokens.id AND tokens.is_deactivated = 0
            ORDER BY token_contents.token_id, contents.id
            """)
            token_contents = cursor.fetchall()

        keys = [
            {
                "key": row['content_key'],
                "description": row['description'],
            } for row in default_contents
        ]

        defaults = [
            {
                "key": row['content_key'],
                "value": row['content_value'],
            } for row in default_contents
        ]
        tokens = [
            {
                "token_id": row['token_id'],
                "key": row['content_key'],
                "value": row['content_value'],
            } for row in token_contents
        ]

        return jsonify({
            "keys": keys,
            "defaults": defaults,
            "tokens": tokens,
        })
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/contents', methods=['POST'])
def handle_create_contents():
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.get_json()

    token_id = data.get('token_id')
    key = data.get('key')
    value = data.get('value')
    if not key or not value:
        return jsonify({'status': 'error', 'message': 'Не переданы необходимые данные'}), 400

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("SELECT id FROM contents WHERE content_key = ?", (key,))
            content_row = cursor.fetchone()
            if not content_row:
                return jsonify({'status': 'error', 'message': 'Не найден контент с переданным ключом'}), 404

            token_id_where_clause = "token_id IS NULL"
            where_clause_parameters = [content_row['id']]
            if token_id:
                token_id_where_clause = "token_id = ?"
                where_clause_parameters.append(token_id)

            cursor.execute("SELECT id FROM token_contents WHERE content_id = ? AND {}".format(token_id_where_clause),
                            where_clause_parameters)
            token_content_row = cursor.fetchone()

            if token_content_row:
                cursor.execute("UPDATE token_contents SET content_value = ? WHERE content_id = ? AND {}".format(token_id_where_clause),
                               (value, *where_clause_parameters))
            else:
                cursor.execute("INSERT INTO token_contents (token_id, content_id, content_value) VALUES (?, ?, ?)",
                               (token_id, content_row['id'], value))

            g.db.commit()

        return jsonify({'status': 'success', 'message': 'Данные обновлены'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/contents', methods=['DELETE'])
def handle_delete_contents():
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.get_json()

    token_id = data.get('token_id')
    key = data.get('key')
    if not token_id:
        return jsonify({'status': 'error', 'message': 'Не переданы необходимые данные'}), 400

    try:
        with new_connection_cursor(g.db) as cursor:
            if key:
                cursor.execute("SELECT id FROM contents WHERE content_key = ?", (key,))
                content_row = cursor.fetchone()
                if not content_row:
                    return jsonify({'status': 'error', 'message': 'Не найден контент с переданным ключом'}), 404

                cursor.execute("DELETE FROM token_contents WHERE token_id = ? AND content_id = ?",
                               (token_id, content_row['id']))
            else:
                cursor.execute("DELETE FROM token_contents WHERE token_id = ?", (token_id,))

            g.db.commit()

        return jsonify({'status': 'success', 'message': 'Данные обновлены'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500
