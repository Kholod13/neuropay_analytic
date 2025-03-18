import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { EPiniaStore } from '@/stores/types';
import type { User } from './types';
import { userApi } from '@/shared/server-api';

export const useUserStore = defineStore(EPiniaStore.DASHBOARD_USER, () => {
    const user = ref<User | null>(null);

    const isLoggedIn = computed(() => !!user.value);

    const securityDeposit = computed(() => user.value?.securityDeposit ?? 0);
    const workingDeposit = computed(() => user.value?.workingDeposit ?? 0);
    const frozenDeposit = computed(() => user.value?.frozenDeposit ?? 0);
    const rate = computed(() => user.value?.rate ?? 0);

    const currency = computed(() => user.value?.currency ?? 'RUB');

    async function loadCurrentUser (): Promise<void> {
        const userData = await userApi.getCurrentUser();
        if (!userData) {
            user.value = null;
            return;
        }

        user.value = {
            email: userData.email,
            walletAddress: userData.wallet_address,
            securityDeposit: Number(userData.security_deposit),
            workingDeposit: Number(userData.working_deposit),
            frozenDeposit: Number(userData.frozen_deposit),
            rate: Number(userData.rate),
            currency: userData.currency,
        };
    }

    return {
        user,

        isLoggedIn,
        securityDeposit,
        workingDeposit,
        frozenDeposit,
        rate,
        currency,

        loadCurrentUser,
    };
});

export type UserStoreDefinition = ReturnType<typeof useUserStore>
