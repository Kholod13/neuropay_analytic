from flask import Flask
from .settings import FLASK_DEBUG, HOST, PORT, CLIENT_BUILD_DIR, FLASK_APP_SECRET_KEY
from .routes import init_routes

app = Flask(__name__, template_folder=CLIENT_BUILD_DIR)
app.secret_key = FLASK_APP_SECRET_KEY

init_routes(app)
