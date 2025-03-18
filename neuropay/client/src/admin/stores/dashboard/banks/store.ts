import { defineStore, storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { EPiniaStore } from '@/stores/types';
import type { DashboardBank, UpdateDashboardBankData } from './types';
import { dashboardBanksAdminApi } from '@/shared/server-api';
import { useServerApiHelper } from '@/admin/composables/server-api/helper';
import type { ServerApiActionResult } from '@/admin/composables/server-api/types';
import { mapDataRecordsById } from '@/shared/utils/utils';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import { useBanksStore, useDashboardTokensStore } from '@/admin/stores';

export const useDashboardBanksStore = defineStore(EPiniaStore.ADMIN_DASHBOARD_BANKS, () => {
    const { tokensById } = storeToRefs(useDashboardTokensStore());
    const { banksById } = storeToRefs(useBanksStore());

    const { loadTokens } = useDashboardTokensStore();
    const { loadBanks } = useBanksStore();

    const dashboardBanks = ref<DashboardBank[]>([]);

    const dashboardBanksById = computed(() => mapDataRecordsById(dashboardBanks.value));

    const { handleRawAction } = useServerApiHelper();

    async function loadDashboardBanks (): Promise<void> {
        const promise = dashboardBanksAdminApi.getAll();

        await Promise.all([
            promise,
            loadTokens(),
            loadBanks(),
        ]);

        const data = await promise;
        dashboardBanks.value = data.map(bank => ({
            id: bank.id,
            token: bank.token_id ? tokensById.value[bank.token_id] : undefined,
            bank: banksById.value[bank.bank_id],
            sortOrder: Number(bank.sort_order),
        }));
    }

    async function createDashboardBank (tokenId: DashboardToken['id'] | null, data: UpdateDashboardBankData): Promise<ServerApiActionResult> {
        return await handleRawAction(
            async () => await dashboardBanksAdminApi.create(tokenId, {
                name: data.name,
                sort_order: data.sortOrder,
            }),
            loadDashboardBanks,
        );
    }

    async function updateDashboardBank (id: DashboardBank['id'], data: UpdateDashboardBankData): Promise<ServerApiActionResult> {
        return await handleRawAction(
            async () => await dashboardBanksAdminApi.update(id, {
                name: data.name,
                sort_order: data.sortOrder,
            }),
            loadDashboardBanks,
        );
    }

    async function deleteDashboardBank (id: DashboardBank['id']): Promise<ServerApiActionResult> {
        return await handleRawAction(
            async () => await dashboardBanksAdminApi.delete(id),
            loadDashboardBanks,
        );
    }

    async function deleteAllDashboardBanks (tokenId: DashboardToken['id']): Promise<ServerApiActionResult> {
        return await handleRawAction(
            async () => await dashboardBanksAdminApi.deleteAll(tokenId),
            loadDashboardBanks,
        );
    }

    return {
        dashboardBanks,

        dashboardBanksById,

        loadDashboardBanks,
        createDashboardBank,
        updateDashboardBank,
        deleteDashboardBank,
        deleteAllDashboardBanks,
    };
});

export type DashboardBanksStoreDefinition = ReturnType<typeof useDashboardBanksStore>
