import { ADMIN_BASE_PATH } from './constants';

export function getAdminRoutePath (path = ''): string {
    return `${ADMIN_BASE_PATH}${path}`;
}

export function isAdminRoutePath (path: string): boolean {
    return path.startsWith(ADMIN_BASE_PATH);
}
