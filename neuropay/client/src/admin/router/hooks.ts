import type { RouteLocationNormalized } from 'vue-router';
import { anonymousOnlyAdminRouteNames } from './constants';
import { useAdminUserStore } from '@/admin/stores';
import { beforeEachNavigationGuard } from '@/router/utils';
import { ERouteName, type Route } from '@/router/types';

export async function adminBeforeEach (to: RouteLocationNormalized): Promise<Route | undefined> {
    const adminUserStore = useAdminUserStore();
    await adminUserStore.loadCurrentUser();

    return beforeEachNavigationGuard(
        adminUserStore.isSignedIn,
        anonymousOnlyAdminRouteNames.includes(to.name as ERouteName),
        ERouteName.ADMIN_LOGIN,
        ERouteName.ADMIN_DASHBOARD_TOKENS,
    );
}
