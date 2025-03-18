from flask import Blueprint, g, request, jsonify, abort

from app.db.connection import new_connection_cursor
from ..auth import signin, logout, is_authenticated
from .blueprint import bp_admin

@bp_admin.route('/signin', methods=['POST'])
def handle_signin():
    if not request.is_json:
        return abort(415)

    data = request.get_json()
    login = data.get('login')
    password = data.get('password')

    if signin(login, password):
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'error', 'message': 'Неверный логин или пароль.'})


@bp_admin.route('/logout', methods=['POST'])
def handle_logout():
    logout()
    return jsonify(None)


@bp_admin.route('/user', methods=['GET'])
def handle_get_current_user():
    if not is_authenticated():
        logout()
        return jsonify(None)

    return jsonify({
        'login': g.admin_user_data['login'],
    })
