from flask import g, jsonify, abort, request

from app.db.connection import new_connection_cursor
from ..auth import is_authenticated
from .blueprint import bp_admin


@bp_admin.route('/dashboard/statistics', methods=['GET'])
def handle_get_statistics():
    if not is_authenticated():
        return abort(401)

    from_date = request.args.get('from_date')
    to_date = request.args.get('to_date')
    if not from_date or not to_date:
        return abort(400)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("""
            SELECT kpi_statistics.*
            FROM kpi_statistics
            INNER JOIN tokens ON kpi_statistics.token_id = tokens.id
            WHERE tokens.is_deactivated = 0 AND (kpi_statistics.date IS NULL OR kpi_statistics.date BETWEEN ? AND ?)
            ORDER BY kpi_statistics.date
            """, (from_date, to_date))
            rows = cursor.fetchall()

        statistics = [
            {
                "token_id": row['token_id'],
                "date": row['date'],
                "profit": row['profit'],
                "transactions_count": row['transactions_count'],
            } for row in rows
        ]

        return jsonify(statistics)
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/statistics', methods=['POST'])
def handle_create_statistics():
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.get_json()
    token_id = data.get('token_id')
    date = data.get('date')
    profit = data.get('profit', 0)
    transactions_count = data.get('transactions_count', 0)
    if not token_id:
        return abort(400)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("SELECT * FROM kpi_statistics WHERE token_id = ? AND date = ?", (token_id, date))
            row = cursor.fetchone()

            if row:
                date_query = "date IS NULL"
                parameters = [profit, transactions_count, token_id]
                if date:
                    date_query = "date = ?"
                    parameters.append(date)

                cursor.execute(
                    "UPDATE kpi_statistics SET profit = ?, transactions_count = ? WHERE token_id = ? AND {date_query}".format(
                        date_query=date_query),
                    parameters)
            else:
                cursor.execute(
                    "INSERT INTO kpi_statistics (token_id, date, profit, transactions_count) VALUES (?, ?, ?, ?)",
                    (token_id, date, profit, transactions_count))

            g.db.commit()

        return jsonify({'status': 'success', 'message': 'Статистика обновлена'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/statistics', methods=['DELETE'])
def handle_delete_statistics():
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    data = request.get_json()
    token_id = data.get('token_id')
    if not token_id:
        return abort(400)

    date_range = data.get('date_range', {})
    from_date = date_range.get('from')
    to_date = date_range.get('to')
    if date_range and not (from_date and to_date):
        return abort(400)

    try:
        with new_connection_cursor(g.db) as cursor:
            if from_date and to_date:
                cursor.execute(
                    "DELETE FROM kpi_statistics WHERE token_id = ? AND (date BETWEEN ? AND ? OR date IS NULL)",
                    (token_id, from_date, to_date))
            else:
                cursor.execute("DELETE FROM kpi_statistics WHERE token_id = ? AND date IS NULL", (token_id,))
            g.db.commit()

        return jsonify({'status': 'success', 'message': 'Статистика удалена'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_admin.route('/dashboard/statistics/<int:token_id>', methods=['DELETE'])
def handle_delete_all_statistics(token_id):
    if not is_authenticated():
        return abort(401)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("DELETE FROM kpi_statistics WHERE token_id = ?", (token_id,))
            g.db.commit()

        return jsonify({'status': 'success', 'message': 'Статистика удалена'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500
