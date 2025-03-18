import requests

from app.settings import TRONGRID_API_KEY


def fetch_wallet_transactions(wallet_address):
    url = f"https://api.trongrid.io/v1/accounts/{wallet_address}/transactions"
    headers = {
        'TRON-PRO-API-KEY': TRONGRID_API_KEY
    }
    response = requests.get(url, headers)

    return response.json()


def fetch_wallet_balance(wallet_address):
    # Запрос для получения данных по токенам на кошельке через Tronscan API
    api_url = f"https://apilist.tronscan.org/api/account?address={wallet_address}"
    response = requests.get(api_url)

    if response.status_code != 200:
        raise Exception("Не удалось получить данные с кошелька")

    data = response.json()

    # Ищем токен USDT (TRC20)
    usdt_balance = 0.0
    for token in data.get('tokens', []):
        if token['tokenName'] == 'Tether USD' and token['tokenAbbr'] == 'USDT':
            usdt_balance = float(token['balance']) / 1000000  # Преобразуем в USDT

    # Возвращаем баланс и адрес
    return usdt_balance
