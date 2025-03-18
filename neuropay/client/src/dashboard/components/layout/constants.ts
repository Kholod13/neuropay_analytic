import type { NavigationItem } from '@/shared/components/navigation/types';
import { ERouteName } from '@/router/types';

export const navItems: NavigationItem[] = [
    {
        icon: 'pi pi-home',
        label: 'Главная',
        route: { name: ERouteName.DASHBOARD_HOME },
    },
    {
        icon: 'pi pi-wallet',
        label: 'Карты и кошельки',
        route: { name: ERouteName.DASHBOARD_CARDS },
    },
    {
        icon: 'pi pi-info-circle',
        label: 'Информация',
        route: { name: ERouteName.DASHBOARD_INFO },
    },
    {
        icon: 'pi pi-chart-bar',
        label: 'Аналитика',
        route: { name: ERouteName.DASHBOARD_ANALYTICS },
    },
    {
        icon: 'pi pi-shopping-cart',
        label: 'Вход',
        route: { name: ERouteName.DASHBOARD_SALES },
    },
    {
        icon: 'pi pi-money-bill',
        label: 'Выход',
        route: { name: ERouteName.DASHBOARD_ORDERS },
    },
    {
        icon: 'pi pi-dollar',
        label: 'Баланс',
        route: { name: ERouteName.DASHBOARD_BALANCE },
    },
    {
        icon: 'pi pi-comments',
        label: 'Апелляции',
        route: { name: ERouteName.DASHBOARD_APPEALS },
    },
];
