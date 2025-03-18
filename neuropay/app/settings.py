import os

from dotenv import load_dotenv

load_dotenv()

PRODUCTION = os.getenv('APP_ENV', 'prod') == 'prod'

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT_DIR = BASE_DIR

CLIENT_DIR = os.path.join(ROOT_DIR, 'client')
CLIENT_BUILD_DIR = os.path.join(CLIENT_DIR, 'dist')

FLASK_APP_SECRET_KEY = os.getenv('FLASK_APP_SECRET_KEY')
FLASK_DEBUG = int(os.getenv('FLASK_DEBUG', '0')) == 1 and not PRODUCTION

HOST = os.getenv('HOST', '0.0.0.0')
PORT = int(os.getenv('PORT', 5000))

TRONGRID_API_KEY = os.getenv('TRONGRID_API_KEY')
