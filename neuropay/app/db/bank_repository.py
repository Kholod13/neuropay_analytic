from app.db.connection import new_connection_cursor


def get_active_token_banks(db_connection, token_id, sort=False):
    with new_connection_cursor(db_connection) as cursor:
        cursor.execute(
            """SELECT banks.id,
                   banks.name,
                   COALESCE(token_banks.sort_order, 100) AS sort_order
            FROM banks
                     LEFT JOIN token_banks
                               ON token_banks.bank_id = banks.id
                                   AND (
                                      token_banks.token_id = :token_id
                                          OR (token_banks.token_id IS NULL
                                          AND NOT EXISTS (SELECT 1
                                                          FROM token_banks
                                                          WHERE token_id = :token_id)
                                          )
                                      )
                     LEFT JOIN cards
                               ON cards.bank_id = banks.id
                                   AND cards.token_id = :token_id
            WHERE token_banks.id IS NOT NULL
               OR cards.id IS NOT NULL
            GROUP BY banks.id
            {order_by}""".format(order_by="ORDER BY sort_order, token_banks.id" if sort else "")
            ,
            {'token_id': token_id}
        )
        rows = cursor.fetchall()

    return rows


def get_or_create_bank(db_connection, name):
    with new_connection_cursor(db_connection) as cursor:
        cursor.execute("SELECT * FROM banks WHERE name = ?", (name,))
        bank = cursor.fetchone()
        if not bank:
            cursor.execute("INSERT INTO banks (name) VALUES (?) RETURNING *", (name,))
            bank = cursor.fetchone()
            db_connection.commit()

    return bank
