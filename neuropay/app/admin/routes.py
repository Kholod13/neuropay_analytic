from flask import Blueprint

bp_admin = Blueprint('admin', __name__)

@bp_admin.route('/')
def index():
    return "Welcome to the Admin page!"
