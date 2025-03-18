from app.db.connection import new_connection_cursor


def get_dynamic_contents(db_connection, token_id):
    with new_connection_cursor(db_connection) as cursor:
        cursor.execute('''
            SELECT contents.content_key, token_contents.content_value
            FROM contents
            LEFT JOIN token_contents
              ON token_contents.content_id = contents.id AND (token_contents.token_id = ? OR token_contents.token_id IS NULL)
            ORDER BY token_contents.token_id
            ''', (token_id,))
        rows = cursor.fetchall()

    contents = {}
    for row in rows:
        contents[row['content_key']] = row['content_value']

    return contents
