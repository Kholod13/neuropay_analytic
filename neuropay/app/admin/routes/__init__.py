from flask import g

from .blueprint import bp_admin
from ..auth import try_authenticate_current_request


@bp_admin.before_request
def initialize_context():
    try_authenticate_current_request(g.db)


from . import (
    user,
    banks,
    wallets,
    dashboard_banks,
    dashboard_contents,
    dashboard_cards,
    dashboard_tokens,
    dashboard_users,
    dashboard_statistics
)
