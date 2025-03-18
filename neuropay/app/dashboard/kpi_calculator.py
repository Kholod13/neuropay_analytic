from app.db.connection import new_connection_cursor


def get_kpi_statistics(db_connection, token_id, from_date, to_date):
    with new_connection_cursor(db_connection) as cursor:
        cursor.execute("SELECT * FROM kpi_statistics WHERE token_id = ? AND date BETWEEN ? AND ?",
                       (token_id, from_date, to_date))
        rows = cursor.fetchall()

    return [
        {
            "date": row['date'],
            "profit": row['profit'],
            "transactions_count": row['transactions_count'],
        } for row in rows
    ]


def get_total_kpi(db_connection, token_id):
    with new_connection_cursor(db_connection) as cursor:
        cursor.execute("SELECT * FROM kpi_statistics WHERE token_id = ? AND date IS NULL", (token_id,))
        row = cursor.fetchone()

    if row:
        return {
            "profit": row['profit'],
            "transactions_count": row['transactions_count'],
        }

    with new_connection_cursor(db_connection) as cursor:
        cursor.execute(
            "SELECT SUM(profit) AS profit, SUM(transactions_count) AS transactions_count FROM kpi_statistics WHERE token_id = ?",
            (token_id,))
        row = cursor.fetchone()

    return {
        "profit": row['profit'] or 0.0,
        "transactions_count": row['transactions_count'] or 0,
    }
