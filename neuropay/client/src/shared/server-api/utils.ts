import { ADMIN_BASE_API_URL, DASHBOARD_BASE_API_URL } from './constants';

export function getDashboardRouteUrl (url: string): string {
    return `${DASHBOARD_BASE_API_URL}${url}`;
}

export function getAdminRouteUrl (url: string): string {
    return `${ADMIN_BASE_API_URL}${url}`;
}
