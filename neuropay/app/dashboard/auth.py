from flask import g, session
from app.db.user_repository import find_active_user_data_by_id, find_active_user_data_by_credentials


def login(email, password):
    if not email or not password:
        return False

    user = find_active_user_data_by_credentials(g.db, email, password)
    if not user:
        return False

    session['user'] = {
        'id': user['id'],
        'email': user['email'],
        'password': user['password'],
    }
    authenticate_current_request(user)

    return True


def authenticate_current_request(user_data):
    g.user_data = {
        'id': user_data['id'],
        'token_id': user_data['token_id'],
        'token': user_data['token'],
        'email': user_data['email'],
        'password': user_data['password'],
        'wallet_address': user_data['wallet_address'],
        'security_deposit': user_data['security_deposit'],
        'working_deposit': user_data['working_deposit'],
        'frozen_deposit': user_data['frozen_deposit'],
        'rate': user_data['rate'],
        'currency': user_data['currency'],
    }


def logout():
    if 'user' in session:
        session.pop('user')
    g.user_data = None


def is_authenticated():
    return (bool(g.get('user_data'))
            and g.user_data['id'] == session.get('user', {}).get('id')
            and g.user_data['email'] == session.get('user', {}).get('email')
            and g.user_data['password'] == session.get('user', {}).get('password'))


def try_authenticate_current_request(db_connection):
    user_id = session.get('user', {}).get('id')
    if not user_id:
        return

    user = find_active_user_data_by_id(db_connection, user_id)
    if user:
        authenticate_current_request(user)
