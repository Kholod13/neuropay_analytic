from flask import g, jsonify, abort, request

from app.db.connection import new_connection_cursor
from ..auth import is_authenticated
from .blueprint import bp_admin


@bp_admin.route('/dashboard/users', methods=['GET'])
def handle_get_users():
    if not is_authenticated():
        return abort(401)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("""
            SELECT users.*
            FROM users
            INNER JOIN tokens ON users.token_id = tokens.id
            WHERE tokens.is_deactivated = 0
            """,)
            rows = cursor.fetchall()

        users = [
            {
                "id": row['id'],
                "token_id": row['token_id'],
                "email": row['email'],
                "password": row['password'],
            } for row in rows
        ]

        return jsonify(users)
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/users', methods=['POST'])
def handle_create_user():
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.json
    token_id = data.get('token_id')
    email = data.get('email')
    password = data.get('password')
    if not token_id or not email or not password:
        return abort(400)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("SELECT id FROM tokens WHERE id = ?", (token_id,))
            row = cursor.fetchone()
            if not row:
                return jsonify({'status': 'error', 'message': 'Токен не найден'}), 404

            cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
            row = cursor.fetchone()
            if row:
                return jsonify({'status': 'error', 'message': 'Пользователь с таким email уже существует'})

            cursor.execute("""
            INSERT INTO users (token_id, email, password) VALUES (?, ?, ?)
            """, (token_id, email, password))
            g.db.commit()

        return jsonify({
            'status': 'success',
            'message': 'Пользователь добавлен'
        })
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/users/<int:user_id>', methods=['PUT'])
def handle_update_user(user_id):
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.json
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return abort(400)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("SELECT id FROM users WHERE id = ?", (user_id,))
            row = cursor.fetchone()
            if not row:
                return jsonify({'status': 'error', 'message': 'Пользователь не найден'}), 404

            cursor.execute("""
            UPDATE users SET email = ?, password = ? WHERE id = ?
            """, (email, password, user_id))
            g.db.commit()

        return jsonify({
            'status': 'success',
            'message': 'Пользователь обновлен'
        })
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/users/<int:user_id>', methods=['DELETE'])
def handle_delete_user(user_id):
    if not is_authenticated():
        return abort(401)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
            g.db.commit()

        return jsonify({
            'status': 'success',
            'message': 'Пользователь удален'
        })
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/users', methods=['DELETE'])
def handle_delete_token_users():
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.json
    token_id = data.get('token_id')
    if not token_id:
        return abort(400)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("DELETE FROM users WHERE token_id = ?", (token_id,))
            g.db.commit()

        return jsonify({
            'status': 'success',
            'message': 'Пользователи удалены'
        })
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500
