from flask import g, session
from app.db.admin_user_repository import find_admin_user_data_by_id, find_admin_user_data_by_credentials


def signin(login, password):
    if not login or not password:
        return False

    user = find_admin_user_data_by_credentials(g.db, login, password)
    if not user:
        return False

    session['admin_user'] = {
        'id': user['id'],
        'login': user['login'],
        'password': user['password'],
    }
    authenticate_current_request(user)

    return True


def authenticate_current_request(user_data):
    g.admin_user_data = {
        'id': user_data['id'],
        'login': user_data['login'],
        'password': user_data['password'],
    }


def logout():
    if 'admin_user' in session:
        session.pop('admin_user')
    g.admin_user_data = None


def is_authenticated():
    return (bool(g.get('admin_user_data'))
            and g.admin_user_data['id'] == session.get('admin_user', {}).get('id')
            and g.admin_user_data['login'] == session.get('admin_user', {}).get('login')
            and g.admin_user_data['password'] == session.get('admin_user', {}).get('password'))


def try_authenticate_current_request(db_connection):
    user_id = session.get('admin_user', {}).get('id')
    if not user_id:
        return

    user = find_admin_user_data_by_id(db_connection, user_id)
    if user:
        authenticate_current_request(user)
