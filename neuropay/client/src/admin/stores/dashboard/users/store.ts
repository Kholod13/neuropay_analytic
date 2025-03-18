import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { EPiniaStore } from '@/stores/types';
import type { DashboardUser, DashboardUserData } from './types';
import { dashboardUsersAdminApi } from '@/shared/server-api';
import { mapDataRecordsById } from '@/shared/utils/utils';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import type { ServerApiActionResult } from '@/admin/composables/server-api/types';
import { useServerApiHelper } from '@/admin/composables/server-api/helper';

export const useDashboardUsersStore = defineStore(EPiniaStore.ADMIN_DASHBOARD_USERS, () => {
    const { handleRawAction } = useServerApiHelper();

    const users = ref<DashboardUser[]>([]);

    const usersById = computed(() => mapDataRecordsById(users.value));
    const usersByTokenId = computed(() =>
        users.value.reduce((acc, user) => {
            if (!acc[user.tokenId]) {
                acc[user.tokenId] = [];
            }
            acc[user.tokenId].push(user);

            return acc;
        }, {} as Record<DashboardToken['id'], DashboardUser[]>),
    );

    async function loadUsers (): Promise<void> {
        const data = await dashboardUsersAdminApi.getAll();

        users.value = data.map(user => ({
            id: user.id,
            tokenId: user.token_id,
            email: user.email,
            password: user.password,
        }));
    }

    async function createUser (tokenId: DashboardToken['id'], data: DashboardUserData): Promise<ServerApiActionResult> {
        return handleRawAction(
            async () => dashboardUsersAdminApi.create(tokenId, data),
            loadUsers,
        );
    }

    async function updateUser (id: DashboardUser['id'], data: DashboardUserData): Promise<ServerApiActionResult> {
        return handleRawAction(
            async () => dashboardUsersAdminApi.update(id, data),
            loadUsers,
        );
    }

    async function deleteUser (id: DashboardUser['id']): Promise<ServerApiActionResult> {
        return handleRawAction(
            async () => dashboardUsersAdminApi.delete(id),
            loadUsers,
        );
    }

    async function deleteAllUsers (tokenId: DashboardToken['id']): Promise<ServerApiActionResult> {
        return handleRawAction(
            async () => dashboardUsersAdminApi.deleteAll(tokenId),
            loadUsers,
        );
    }

    return {
        users,

        usersById,
        usersByTokenId,

        loadUsers,
        createUser,
        updateUser,
        deleteUser,
        deleteAllUsers,
    };
});

export type DashboardUsersStoreDefinition = ReturnType<typeof useDashboardUsersStore>
