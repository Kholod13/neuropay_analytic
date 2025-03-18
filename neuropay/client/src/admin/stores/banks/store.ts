import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { EPiniaStore } from '@/stores/types';
import type { Bank } from './types';
import { banksAdminApi } from '@/shared/server-api';
import { mapDataRecordsById } from '@/shared/utils/utils';

export const useBanksStore = defineStore(EPiniaStore.ADMIN_BANKS, () => {
    const banks = ref<Bank[]>([]);

    const banksById = computed(() => mapDataRecordsById(banks.value));

    async function loadBanks (): Promise<void> {
        banks.value = await banksAdminApi.getAll();
    }

    return {
        banks,

        banksById,

        loadBanks,
    };
});

export type BanksStoreDefinition = ReturnType<typeof useBanksStore>
