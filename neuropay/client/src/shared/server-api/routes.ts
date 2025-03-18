import { getAdminRouteUrl, getDashboardRouteUrl } from './utils';
import type { Wallet } from '@/shared/server-api/admin';
import type { DashboardUser } from '@/shared/server-api/admin/dashboard/users/types';
import type { DashboardBank } from '@/shared/server-api/admin/dashboard/banks/types';

const ServerRoutes = {
    DASHBOARD_SIGNUP: getDashboardRouteUrl('/signup'),
    DASHBOARD_LOGIN: getDashboardRouteUrl('/login'),
    DASHBOARD_LOGOUT: getDashboardRouteUrl('/logout'),

    DASHBOARD_GET_CURRENT_USER: getDashboardRouteUrl('/user'),

    DASHBOARD_GET_CARDS: getDashboardRouteUrl('/cards'),
    DASHBOARD_CREATE_CARD: getDashboardRouteUrl('/cards'),
    DASHBOARD_UPDATE_CARD: (cardId: string) => getDashboardRouteUrl(`/cards/${cardId}`),
    DASHBOARD_DELETE_CARD: (cardId: string) => getDashboardRouteUrl(`/cards/${cardId}`),

    DASHBOARD_GET_KPI_STATISTICS: getDashboardRouteUrl('/kpi/statistics'),
    DASHBOARD_GET_KPI_TOTALS: getDashboardRouteUrl('/kpi/totals'),

    DASHBOARD_GET_BANKS: getDashboardRouteUrl('/banks'),

    DASHBOARD_GET_CONTENTS: getDashboardRouteUrl('/contents'),

    ADMIN_SIGNIN: getAdminRouteUrl('/signin'),
    ADMIN_LOGOUT: getAdminRouteUrl('/logout'),

    ADMIN_GET_CURRENT_USER: getAdminRouteUrl('/user'),

    ADMIN_GET_BANKS: getAdminRouteUrl('/banks'),

    ADMIN_GET_WALLETS: getAdminRouteUrl('/wallets'),
    ADMIN_CREATE_WALLET: getAdminRouteUrl('/wallets'),
    ADMIN_UPDATE_WALLET: (walletId: Wallet['id']) => getAdminRouteUrl(`/wallets/${walletId}`),
    ADMIN_DELETE_WALLET: (walletId: Wallet['id']) => getAdminRouteUrl(`/wallets/${walletId}`),

    ADMIN_GET_DASHBOARD_BANKS: getAdminRouteUrl('/dashboard/banks'),
    ADMIN_CREATE_DASHBOARD_BANK: getAdminRouteUrl('/dashboard/banks'),
    ADMIN_UPDATE_DASHBOARD_BANK: (id: DashboardBank['id']) => getAdminRouteUrl(`/dashboard/banks/${id}`),
    ADMIN_DELETE_DASHBOARD_BANK: (id: DashboardBank['id']) => getAdminRouteUrl(`/dashboard/banks/${id}`),
    ADMIN_DELETE_ALL_DASHBOARD_BANKS: getAdminRouteUrl('/dashboard/banks'),

    ADMIN_GET_DASHBOARD_CONTENTS: getAdminRouteUrl('/dashboard/contents'),
    ADMIN_UPDATE_DASHBOARD_CONTENTS: getAdminRouteUrl('/dashboard/contents'),
    ADMIN_DELETE_DASHBOARD_CONTENTS: getAdminRouteUrl('/dashboard/contents'),

    ADMIN_GET_DASHBOARD_CARDS: getAdminRouteUrl('/dashboard/cards'),
    ADMIN_DELETE_DASHBOARD_CARD: getAdminRouteUrl('/dashboard/cards'),

    ADMIN_GET_DASHBOARD_STATISTICS: getAdminRouteUrl('/dashboard/statistics'),
    ADMIN_UPDATE_DASHBOARD_STATISTICS: getAdminRouteUrl('/dashboard/statistics'),
    ADMIN_DELETE_DASHBOARD_STATISTICS: getAdminRouteUrl('/dashboard/statistics'),

    ADMIN_GET_DASHBOARD_TOKENS: getAdminRouteUrl('/dashboard/tokens'),
    ADMIN_CREATE_DASHBOARD_TOKEN: getAdminRouteUrl('/dashboard/tokens'),
    ADMIN_UPDATE_DASHBOARD_TOKEN: (tokenId: DashboardUser['id']) => getAdminRouteUrl(`/dashboard/tokens/${tokenId}`),
    ADMIN_DELETE_DASHBOARD_TOKEN: (tokenId: DashboardUser['id']) => getAdminRouteUrl(`/dashboard/tokens/${tokenId}`),

    ADMIN_GET_DASHBOARD_USERS: getAdminRouteUrl('/dashboard/users'),
    ADMIN_CREATE_DASHBOARD_USER: getAdminRouteUrl('/dashboard/users'),
    ADMIN_UPDATE_DASHBOARD_USER: (userId: DashboardUser['id']) => getAdminRouteUrl(`/dashboard/users/${userId}`),
    ADMIN_DELETE_DASHBOARD_USER: (userId: DashboardUser['id']) => getAdminRouteUrl(`/dashboard/users/${userId}`),
    ADMIN_DELETE_ALL_DASHBOARD_USERS: getAdminRouteUrl('/dashboard/users'),
} as const;

export default ServerRoutes;
