import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { EPiniaStore } from '@/stores/types';
import type { AdminUser } from './types';
import { adminUserApi } from '@/shared/server-api';

export const useAdminUserStore = defineStore(EPiniaStore.ADMIN_USER, () => {
    const user = ref<AdminUser | null>(null);

    const isSignedIn = computed(() => !!user.value);

    async function loadCurrentUser (): Promise<void> {
        user.value = await adminUserApi.getCurrentUser();
    }

    return {
        user,

        isSignedIn,

        loadCurrentUser,
    };
});

export type AdminUserStoreDefinition = ReturnType<typeof useAdminUserStore>
