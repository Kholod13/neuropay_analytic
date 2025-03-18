import type { RouteLocationNormalized } from 'vue-router';
import { anonymousOnlyDashboardRouteNames } from './constants';
import { useUserStore } from '@/dashboard/stores';
import { beforeEachNavigationGuard } from '@/router/utils';
import { ERouteName, type Route } from '@/router/types';

export async function dashboardBeforeEach (to: RouteLocationNormalized): Promise<Route | undefined> {
    const userStore = useUserStore();
    await userStore.loadCurrentUser();

    return beforeEachNavigationGuard(
        userStore.isLoggedIn,
        anonymousOnlyDashboardRouteNames.includes(to.name as ERouteName),
        ERouteName.DASHBOARD_LOGIN,
        ERouteName.DASHBOARD_HOME,
    );
}
