from app.db.connection import new_connection_cursor
from app.db.utils import normalize_query_parameters


def find_active_user_data_by_id(connection, user_id):
    return find_active_user_data_by(connection, {'users.id': user_id})


def find_active_user_data_by_credentials(connection, email, password):
    return find_active_user_data_by(connection, {
        'users.email': email,
        'users.password': password
    })


def find_active_user_data_by(connection, filters_dict):
    fields, parameters = normalize_query_parameters({'tokens.is_deactivated': 0} | filters_dict)

    with new_connection_cursor(connection) as cursor:
        cursor.execute(f'''
            SELECT users.*, tokens.token, tokens.security_deposit, tokens.working_deposit, tokens.frozen_deposit, tokens.rate, tokens.currency, wallets.wallet_address
            FROM users
            INNER JOIN tokens ON users.token_id = tokens.id
            INNER JOIN wallets ON tokens.wallet_id = wallets.id
            WHERE {' AND '.join(fields)}
            ''',
            parameters
        )
        return cursor.fetchone()
