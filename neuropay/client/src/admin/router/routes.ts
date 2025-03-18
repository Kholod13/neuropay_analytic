import type { RouteRecordRaw } from 'vue-router';
import { ERouteName } from '@/router/types';
import { getAdminRoutePath } from './utils';

export const adminRoutes: RouteRecordRaw[] = [
    {
        path: getAdminRoutePath('/login'),
        name: ERouteName.ADMIN_LOGIN,
        component: () => import('@/admin/views/LoginView.vue'),
    },

    {
        path: getAdminRoutePath('/tokens'),
        name: ERouteName.ADMIN_DASHBOARD_TOKENS,
        component: () => import('@/admin/views/dashboard/TokensView.vue'),
    },
    {
        path: getAdminRoutePath('/users'),
        name: ERouteName.ADMIN_DASHBOARD_USERS,
        component: () => import('@/admin/views/dashboard/UsersView.vue'),
    },
    {
        path: getAdminRoutePath('/statistics'),
        name: ERouteName.ADMIN_DASHBOARD_STATISTICS,
        component: () => import('@/admin/views/dashboard/StatisticsView.vue'),
    },
    {
        path: getAdminRoutePath('/cards'),
        name: ERouteName.ADMIN_DASHBOARD_CARDS,
        component: () => import('@/admin/views/dashboard/CardsView.vue'),
    },
    {
        path: getAdminRoutePath('/contents'),
        name: ERouteName.ADMIN_DASHBOARD_CONTENTS,
        component: () => import('@/admin/views/dashboard/ContentsView.vue'),
    },
    {
        path: getAdminRoutePath('/banks'),
        name: ERouteName.ADMIN_DASHBOARD_BANKS,
        component: () => import('@/admin/views/dashboard/BanksView.vue'),
    },
    {
        path: getAdminRoutePath('/wallets'),
        name: ERouteName.ADMIN_DASHBOARD_WALLETS,
        component: () => import('@/admin/views/dashboard/WalletsView.vue'),
    },
];
