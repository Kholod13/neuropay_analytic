import type { RouteRecordRaw } from 'vue-router';
import { ERouteName } from '@/router/types';

export const dashboardRoutes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: ERouteName.DASHBOARD_LOGIN,
        component: () => import('@/dashboard/views/LoginView.vue'),
    },
    {
        path: '/signup',
        name: ERouteName.DASHBOARD_SIGNUP,
        component: () => import('@/dashboard/views/SignupView.vue'),
    },

    {
        path: '/',
        name: ERouteName.DASHBOARD_HOME,
        component: () => import('@/dashboard/views/HomeView.vue'),
    },
    {
        path: '/cards',
        name: ERouteName.DASHBOARD_CARDS,
        component: () => import('@/dashboard/views/CardsView.vue'),
    },
    {
        path: '/info',
        name: ERouteName.DASHBOARD_INFO,
        component: () => import('@/dashboard/views/InfoView.vue'),
    },
    {
        path: '/analytics',
        name: ERouteName.DASHBOARD_ANALYTICS,
        component: () => import('@/dashboard/views/AnalyticsView.vue'),
    },
    {
        path: '/sales',
        name: ERouteName.DASHBOARD_SALES,
        component: () => import('@/dashboard/views/SalesView.vue'),
    },
    {
        path: '/orders',
        name: ERouteName.DASHBOARD_ORDERS,
        component: () => import('@/dashboard/views/OrdersView.vue'),
    },
    {
        path: '/balance',
        name: ERouteName.DASHBOARD_BALANCE,
        component: () => import('@/dashboard/views/BalanceView.vue'),
    },
    {
        path: '/appeals',
        name: ERouteName.DASHBOARD_APPEALS,
        component: () => import('@/dashboard/views/AppealsView.vue'),
    },
];
