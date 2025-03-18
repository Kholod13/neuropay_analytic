import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { EPiniaStore } from '@/stores/types';
import type { Wallet } from './types';
import { walletsAdminApi } from '@/shared/server-api';
import { useServerApiHelper } from '@/admin/composables/server-api/helper';
import type { ServerApiActionResult } from '@/admin/composables/server-api/types';
import { mapDataRecordsById } from '@/shared/utils/utils';

export const useWalletsStore = defineStore(EPiniaStore.ADMIN_WALLETS, () => {
    const wallets = ref<Wallet[]>([]);

    const walletsById = computed(() => mapDataRecordsById(wallets.value));

    const { handleRawAction } = useServerApiHelper();

    async function loadWallets (): Promise<void> {
        wallets.value = await walletsAdminApi.getAll();
    }

    async function createWallet (address: Wallet['address']): Promise<ServerApiActionResult> {
        return handleRawAction(
            async () => walletsAdminApi.create({ address }),
            loadWallets,
        );
    }

    async function updateWallet (id: Wallet['id'], address: Wallet['address']): Promise<ServerApiActionResult> {
        return handleRawAction(
            async () => walletsAdminApi.update(id, { address }),
            loadWallets,
        );
    }

    async function deleteWallet (id: Wallet['id']): Promise<ServerApiActionResult> {
        return handleRawAction(
            async () => walletsAdminApi.delete(id),
            loadWallets,
        );
    }

    return {
        wallets,

        walletsById,

        loadWallets,
        createWallet,
        updateWallet,
        deleteWallet,
    };
});

export type WalletsStoreDefinition = ReturnType<typeof useWalletsStore>
