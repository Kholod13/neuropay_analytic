import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { EPiniaStore } from '@/stores/types';
import type { Bank } from './types';
import { banksApi } from '@/shared/server-api';

export const useBanksStore = defineStore(EPiniaStore.DASHBOARD_BANKS, () => {
    const banks = ref<Bank[]>([]);

    const banksById = computed(() =>
        Object.fromEntries(banks.value.map(bank => [bank.id, bank])),
    );

    async function loadBanks (): Promise<void> {
        banks.value = await banksApi.getAll();
    }

    return {
        banks,

        banksById,

        loadBanks,
    };
});

export type BanksStoreDefinition = ReturnType<typeof useBanksStore>
