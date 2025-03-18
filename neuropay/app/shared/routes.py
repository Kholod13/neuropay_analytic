from flask import Blueprint, render_template, send_from_directory
from app.settings import CLIENT_BUILD_DIR

bp_shared = Blueprint('shared', __name__)


@bp_shared.route('/')
def handle_index():
    return render_template('index.html')


@bp_shared.route('/<path:path>')
def catch_all(path):
    return send_from_directory(CLIENT_BUILD_DIR, path)
