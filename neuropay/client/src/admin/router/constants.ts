import { ERouteName } from '@/router/types';

export const ADMIN_BASE_PATH = import.meta.env.VITE_ADMIN_BASE_PATH ?? '/admin';

export const anonymousOnlyAdminRouteNames: ERouteName[] = [ERouteName.ADMIN_LOGIN];
