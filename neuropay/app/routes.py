from flask import g
from app.db.connection import new_db_connection


def init_routes(app):
    @app.before_request
    def initialize_context():
        g.db = new_db_connection()

    @app.teardown_request
    def reset_context(exception):
        db = g.pop('db', None)
        if db is not None:
            db.close()

    from .admin.routes import bp_admin
    from .dashboard.routes import bp_dashboard
    from .shared.routes import bp_shared

    app.register_blueprint(bp_admin, url_prefix='/api/admin')
    app.register_blueprint(bp_dashboard, url_prefix='/api/dashboard')
    app.register_blueprint(bp_shared)
