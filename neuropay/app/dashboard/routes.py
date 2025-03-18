import random
import datetime

from flask import Blueprint, g, request, jsonify, abort
from app.db.connection import new_connection_cursor
from app.db.utils import normalize_query_parameters
from .auth import is_authenticated, login, logout, try_authenticate_current_request
from app.dashboard.kpi_calculator import get_kpi_statistics, get_total_kpi
from app.db.dynamic_content_repository import get_dynamic_contents
from app.db.bank_repository import get_active_token_banks
from app.shared.utils import validate_entity_id

bp_dashboard = Blueprint('dashboard', __name__)


@bp_dashboard.before_request
def initialize_context():
    try_authenticate_current_request(g.db)


@bp_dashboard.route('/signup', methods=['POST'])
def handle_signup():
    if not request.is_json:
        return abort(415)

    data = request.get_json()
    token = data.get('token')
    email = data.get('email')
    password = data.get('password')

    if not token:
        return jsonify({'status': 'error', 'message': 'Некорректный токен.'})

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute('SELECT id FROM tokens WHERE token = ? AND is_deactivated = 0', (token,))
            token_entity = cursor.fetchone()
            if not token_entity:
                return jsonify({'status': 'error', 'message': 'Некорректный токен.'})

            cursor.execute('SELECT id FROM users WHERE email = ?', (email,))
            if cursor.fetchone():
                return jsonify({'status': 'error', 'message': 'Пользователь с таким e-mail уже существует.'})

            cursor.execute(
                'INSERT INTO users (token_id, email, password) VALUES (?, ?, ?)',
                (token_entity['id'], email, password)
            )
            g.db.commit()

        login(email, password)
        return jsonify({'status': 'success'})

    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_dashboard.route('/login', methods=['POST'])
def handle_login():
    if not request.is_json:
        return abort(415)

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if login(email, password):
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'error', 'message': 'Неверный e-mail или пароль.'})


@bp_dashboard.route('/logout', methods=['POST'])
def handle_logout():
    logout()
    return jsonify(None)


@bp_dashboard.route('/user', methods=['GET'])
def handle_get_current_user():
    if not is_authenticated():
        logout()
        return jsonify(None)

    return jsonify({
        'email': g.user_data['email'],
        'wallet_address': g.user_data['wallet_address'],
        'security_deposit': g.user_data['security_deposit'],
        'working_deposit': g.user_data['working_deposit'],
        'frozen_deposit': g.user_data['frozen_deposit'],
        'rate': g.user_data['rate'],
        'currency': g.user_data['currency'],
    })


@bp_dashboard.route('/cards', methods=['GET'])
def handle_get_cards():
    if not is_authenticated():
        return abort(401)

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute("SELECT * FROM cards WHERE token_id = ?", (g.user_data['token_id'],))
            rows = cursor.fetchall()

        card_list = [
            {
                "id": row['id'],
                "external_id": row['external_id'],
                "bank_id": row['bank_id'],
                "card_number": row['card_number'],
                "account_number": row['account_number'],
                "phone_number": row['phone_number'],
                "hidden": bool(row['hidden'])
            } for row in rows
        ]

        return jsonify(card_list)

    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_dashboard.route('/cards', methods=['POST'])
def handle_add_card():
    if not is_authenticated():
        return abort(401)

    if not request.is_json:
        return abort(415)

    try:
        data = request.get_json()

        bank_id = data.get('bank_id') if data.get('bank_id') else None
        if bank_id and not validate_entity_id(bank_id, get_active_token_banks(g.db, g.user_data['token_id'])):
            return jsonify({'status': 'error', 'message': 'Банк не найден'}), 400

        card_number = data.get('card_number')
        account_number = data.get('account_number')
        phone_number = data.get('phone_number')
        hidden = data.get('hidden', 0)

        external_id = random.randint(1000, 99999)

        with new_connection_cursor(g.db) as cursor:
            cursor.execute("""
                INSERT INTO cards (external_id, token_id, bank_id, card_number, account_number, phone_number, hidden)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (external_id, g.user_data['token_id'], bank_id, card_number, account_number, phone_number, hidden))
            g.db.commit()

        return jsonify({"status": "success"})

    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_dashboard.route('/cards/<int:card_id>', methods=['DELETE'])
def handle_delete_card(card_id):
    if not is_authenticated():
        return abort(401)

    if not card_id:
        return jsonify({'status': 'error', 'message': 'Некорректный запрос'}), 400

    try:
        with new_connection_cursor(g.db) as cursor:
            cursor.execute('SELECT id FROM cards WHERE id = ? AND token_id = ?', (card_id, g.user_data['token_id']))

            card = cursor.fetchone()
            if not card:
                return jsonify({'status': 'error', 'message': 'Карта не найдена'}), 404

            cursor.execute('DELETE FROM cards WHERE id = ?', (card_id,))
            g.db.commit()

        return jsonify({'status': 'success'})

    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_dashboard.route('/cards/<int:card_id>', methods=['PUT'])
def handle_update_card(card_id):
    if not is_authenticated():
        return abort(401)

    try:
        data = request.get_json()
        parameters_dict = {}

        bank_id = data.get('bank_id') if data.get('bank_id') else None
        if bank_id:
            if not validate_entity_id(bank_id, get_active_token_banks(g.db, g.user_data['token_id'])):
                return jsonify({'status': 'error', 'message': 'Банк не найден'}), 400

            parameters_dict['bank_id'] = bank_id

        if 'card_number' in data:
            parameters_dict['card_number'] = data.get('card_number')
        if 'account_number' in data:
            parameters_dict['account_number'] = data.get('account_number')
        if 'phone_number' in data:
            parameters_dict['phone_number'] = data.get('phone_number')
        if 'hidden' in data:
            parameters_dict['hidden'] = data.get('hidden')

        if not parameters_dict:
            return jsonify({"status": "error", "message": "Не переданы данные для обновления"}), 400

        fields, parameters = normalize_query_parameters(parameters_dict)

        with new_connection_cursor(g.db) as cursor:
            cursor.execute(f"""
                UPDATE cards
                SET {', '.join(fields)}
                WHERE id = ? AND token_id = ?
            """, parameters + [card_id, g.user_data['token_id']])
            g.db.commit()

        return jsonify({"status": "success"})

    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_dashboard.route('/kpi/statistics', methods=['GET'])
def handle_get_statistics():
    if not is_authenticated():
        return abort(401)

    try:
        from_date = datetime.date.fromisoformat(request.args.get('from_date'))
        to_date = datetime.date.fromisoformat(request.args.get('to_date'))
    except (ValueError, TypeError):
        return jsonify({"status": "error", "message": "Некорректные параметры запроса"}), 400

    try:
        statistics = get_kpi_statistics(
            db_connection=g.db,
            token_id=g.user_data['token_id'],
            from_date=from_date,
            to_date=to_date,
        )

        return jsonify(statistics)

    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_dashboard.route('/kpi/totals', methods=['GET'])
def handle_get_kpi_totals():
    if not is_authenticated():
        return abort(401)

    try:
        totals = get_total_kpi(g.db, g.user_data['token_id'])

        return jsonify(totals)

    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_dashboard.route('/banks', methods=['GET'])
def handle_get_banks():
    if not is_authenticated():
        return abort(401)

    try:
        bank_entities = get_active_token_banks(g.db, g.user_data['token_id'], sort=True)
        banks = [
            {
                "id": entity['id'],
                "name": entity['name'],
            } for entity in bank_entities
        ]

        return jsonify(banks)

    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500


@bp_dashboard.route('/contents', methods=['GET'])
def handle_get_contents():
    if not is_authenticated():
        return jsonify([])

    try:
        contents = get_dynamic_contents(g.db, g.user_data['token_id'])

        return jsonify(contents)

    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Не удалось выполнить операцию'}), 500
