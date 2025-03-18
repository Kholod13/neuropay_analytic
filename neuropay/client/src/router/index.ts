import { createRouter, createWebHashHistory } from 'vue-router';
import { BASE_URL } from './constants';
import { ERouteName } from './types';
import { adminRoutes, adminBeforeEach, isAdminRoutePath } from '@/admin/router';
import { dashboardRoutes, dashboardBeforeEach } from '@/dashboard/router';

const router = createRouter({
    history: createWebHashHistory(BASE_URL),
    routes: [
        ...adminRoutes,
        ...dashboardRoutes,
    ],
});

router.beforeEach(async (to) => {
    if (!Object.values(ERouteName).includes(to.name as ERouteName)) {
        return { name: ERouteName.DASHBOARD_LOGIN };
    }

    if (isAdminRoutePath(to.path)) {
        return adminBeforeEach(to);
    }

    return dashboardBeforeEach(to);
})

export default router;
