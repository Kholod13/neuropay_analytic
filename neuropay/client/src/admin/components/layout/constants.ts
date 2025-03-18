import type { NavigationItem } from '@/shared/components/navigation/types';
import { ERouteName } from '@/router/types';

export const navItems: NavigationItem[] = [
    {
        icon: 'pi pi-bitcoin',
        label: 'Токены',
        route: { name: ERouteName.ADMIN_DASHBOARD_TOKENS },
    },
    {
        icon: 'pi pi-users',
        label: 'Пользователи',
        route: { name: ERouteName.ADMIN_DASHBOARD_USERS },
    },
    {
        icon: 'pi pi-chart-bar',
        label: 'Статистика',
        route: { name: ERouteName.ADMIN_DASHBOARD_STATISTICS },
    },
    {
        icon: 'pi pi-credit-card',
        label: 'Карты',
        route: { name: ERouteName.ADMIN_DASHBOARD_CARDS },
    },
    {
        icon: 'pi pi-file',
        label: 'Контент',
        route: { name: ERouteName.ADMIN_DASHBOARD_CONTENTS },
    },

    {
        icon: 'pi pi-building-columns',
        label: 'Банки',
        route: { name: ERouteName.ADMIN_DASHBOARD_BANKS },
    },
    {
        icon: 'pi pi-wallet',
        label: 'Кошельки',
        route: { name: ERouteName.ADMIN_DASHBOARD_WALLETS },
    },
];
