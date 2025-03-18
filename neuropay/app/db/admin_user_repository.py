from app.db.connection import new_connection_cursor
from app.db.utils import normalize_query_parameters


def find_admin_user_data_by_id(connection, user_id):
    return find_admin_user_data_by(connection, {'admin_users.id': user_id})


def find_admin_user_data_by_credentials(connection, login, password):
    return find_admin_user_data_by(connection, {
        'admin_users.login': login,
        'admin_users.password': password
    })


def find_admin_user_data_by(connection, filters_dict):
    fields, parameters = normalize_query_parameters(filters_dict)

    with new_connection_cursor(connection) as cursor:
        cursor.execute(
            f"SELECT * FROM admin_users WHERE {' AND '.join(fields)}",
            parameters
        )
        return cursor.fetchone()
