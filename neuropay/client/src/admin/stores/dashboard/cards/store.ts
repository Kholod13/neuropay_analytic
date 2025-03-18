import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { EPiniaStore } from '@/stores/types';
import type { DashboardCard } from './types';
import { dashboardCardsAdminApi } from '@/shared/server-api';
import { useBanksStore, useDashboardTokensStore } from '@/admin/stores';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import { useServerApiHelper } from '@/admin/composables/server-api/helper';
import type { ServerApiActionResult } from '@/admin/composables/server-api/types';

export const useDashboardCardsStore = defineStore(EPiniaStore.ADMIN_DASHBOARD_CARDS, () => {
    const { tokensById } = storeToRefs(useDashboardTokensStore());
    const { banksById } = storeToRefs(useBanksStore());

    const { loadTokens } = useDashboardTokensStore();
    const { loadBanks } = useBanksStore();

    const cards = ref<DashboardCard[]>([]);

    const { handleRawAction } = useServerApiHelper();

    async function loadCards (): Promise<void> {
        const promise = dashboardCardsAdminApi.getAll();

        await Promise.all([
            promise,
            loadBanks(),
            loadTokens(),
        ]);

        const data = await promise;
        cards.value = data.map(card => ({
            id: card.id,
            externalId: card.external_id,
            token: tokensById.value[card.token_id],
            bank: banksById.value[card.bank_id],
            cardNumber: card.card_number,
            accountNumber: card.account_number,
            phoneNumber: card.phone_number,
            hidden: card.hidden,
        }));
    }

    async function deleteCard (id: DashboardCard['id']): Promise<ServerApiActionResult> {
        return handleRawAction(
            async () => dashboardCardsAdminApi.deleteById(id),
            loadCards,
        );
    }

    async function deleteAllTokenCards (tokenId: DashboardToken['id']): Promise<ServerApiActionResult> {
        return handleRawAction(
            async () => dashboardCardsAdminApi.deleteByTokenId(tokenId),
            loadCards,
        );
    }

    return {
        cards,

        loadCards,
        deleteCard,
        deleteAllTokenCards,
    };
});

export type DashboardCardsStoreDefinition = ReturnType<typeof useDashboardCardsStore>
