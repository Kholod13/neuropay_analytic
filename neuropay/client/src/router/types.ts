export enum ERouteName {
    DASHBOARD_LOGIN = 'dashboard-login',
    DASHBOARD_SIGNUP = 'dashboard-signup',
    DASHBOARD_HOME = 'dashboard-home',
    DASHBOARD_CARDS = 'dashboard-cards',
    DASHBOARD_INFO = 'dashboard-info',
    DASHBOARD_ANALYTICS = 'dashboard-analytics',
    DASHBOARD_SALES = 'dashboard-sales',
    DASHBOARD_ORDERS = 'dashboard-orders',
    DASHBOARD_BALANCE = 'dashboard-balance',
    DASHBOARD_APPEALS = 'dashboard-appeals',

    ADMIN_LOGIN = 'admin-login',
    ADMIN_DASHBOARD_TOKENS = 'admin-dashboard-tokens',
    ADMIN_DASHBOARD_USERS = 'admin-dashboard-users',
    ADMIN_DASHBOARD_STATISTICS = 'admin-dashboard-statistics',
    ADMIN_DASHBOARD_CARDS = 'admin-dashboard-cards',
    ADMIN_DASHBOARD_CONTENTS = 'admin-dashboard-contents',
    ADMIN_DASHBOARD_BANKS = 'admin-dashboard-banks',
    ADMIN_DASHBOARD_WALLETS = 'admin-dashboard-wallets',
}

export type Route = {
    name: ERouteName
}
