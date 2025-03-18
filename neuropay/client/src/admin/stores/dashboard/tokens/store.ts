import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { EPiniaStore } from '@/stores/types';
import type { DashboardToken, DashboardTokenData } from './types';
import { dashboardTokensAdminApi } from '@/shared/server-api';
import { mapDataRecordsById } from '@/shared/utils/utils';
import { useServerApiHelper } from '@/admin/composables/server-api/helper';
import type { ServerApiActionResult } from '@/admin/composables/server-api/types';

export const useDashboardTokensStore = defineStore(EPiniaStore.ADMIN_DASHBOARD_TOKENS, () => {
    const { handleRawAction } = useServerApiHelper();

    const tokens = ref<DashboardToken[]>([]);

    const tokensById = computed(() => mapDataRecordsById(tokens.value));

    async function loadTokens (): Promise<void> {
        const tokensData = await dashboardTokensAdminApi.getAll();

        tokens.value = tokensData.map((token): DashboardToken => ({
            id: token.id,
            walletId: token.wallet_id,
            token: token.token,
            securityDeposit: Number(token.security_deposit),
            workingDeposit: Number(token.working_deposit),
            frozenDeposit: Number(token.frozen_deposit),
            rate: Number(token.rate),
            currency: token.currency,
        }));
    }

    async function createToken (data: DashboardTokenData): Promise<ServerApiActionResult> {
        return handleRawAction(
            async () => dashboardTokensAdminApi.create({
                wallet_id: data.walletId,
                token: data.token,
                security_deposit: data.securityDeposit,
                working_deposit: data.workingDeposit,
                frozen_deposit: data.frozenDeposit,
                rate: data.rate,
                currency: data.currency,
            }),
            loadTokens,
        );
    }

    async function updateToken (id: DashboardToken['id'], data: DashboardTokenData): Promise<ServerApiActionResult> {
        return handleRawAction(
            async () => dashboardTokensAdminApi.update(id, {
                wallet_id: data.walletId,
                token: data.token,
                security_deposit: data.securityDeposit,
                working_deposit: data.workingDeposit,
                frozen_deposit: data.frozenDeposit,
                rate: data.rate,
                currency: data.currency,
            }),
            loadTokens,
        );
    }

    async function deleteToken (id: DashboardToken['id']): Promise<ServerApiActionResult> {
        return handleRawAction(
            async () => dashboardTokensAdminApi.delete(id),
            loadTokens,
        );
    }

    return {
        tokens,

        tokensById,

        loadTokens,
        createToken,
        updateToken,
        deleteToken,
    };
});

export type DashboardTokensStoreDefinition = ReturnType<typeof useDashboardTokensStore>
