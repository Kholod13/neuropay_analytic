import type { ValueOf } from '@/shared/utils/typeUtils';

export const EPiniaStore = {
    APPLICATION: 'application',

    DASHBOARD_USER: 'dashboardUser',
    DASHBOARD_CARDS: 'dashboardCards',
    DASHBOARD_BANKS: 'dashboardBanks',
    DASHBOARD_STATISTICS: 'dashboardStatistics',
    DASHBOARD_CONTENTS: 'dashboardContents',

    ADMIN_USER: 'adminUser',
    ADMIN_BANKS: 'adminBanks',
    ADMIN_WALLETS: 'adminWallets',
    ADMIN_DASHBOARD_BANKS: 'adminDashboardBanks',
    ADMIN_DASHBOARD_CONTENTS: 'adminDashboardContents',
    ADMIN_DASHBOARD_CARDS: 'adminDashboardCards',
    ADMIN_DASHBOARD_TOKENS: 'adminDashboardTokens',
    ADMIN_DASHBOARD_USERS: 'adminDashboardUsers',
    ADMIN_DASHBOARD_STATISTICS: 'adminDashboardStatistics',
} as const;
export type EPiniaStore = ValueOf<typeof EPiniaStore>;
