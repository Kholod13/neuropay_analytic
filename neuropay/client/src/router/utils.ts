import type { ERouteName, Route } from './types';
import { useApplicationStore } from '@/shared/stores';

export async function beforeEachNavigationGuard (
    isLoggedIn: boolean,
    isAnonymousOnlyRoute: boolean,
    loginRouteName: ERouteName,
    homeRouteName: ERouteName,
): Promise<Route | undefined> {
    if (!isLoggedIn && !isAnonymousOnlyRoute) {
        return { name: loginRouteName };
    }

    if (isLoggedIn && isAnonymousOnlyRoute) {
        return { name: homeRouteName };
    }

    if (!isAnonymousOnlyRoute) {
        useApplicationStore().setIsLoading(true);
    }
}
