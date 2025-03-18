<template>
    <create-wallet-record-dialog
        @submit="createWalletAction"
        v-model:visible="createWalletDialogVisible" />
    <update-wallet-record-dialog
        @submit="updateWalletAction($event.id, $event.data)"
        v-model:wallet-id="editingWalletId" />

    <page-layout>
        <content-container>
            <table-content-header
                @create="openCreateWalletDialog"
                title="Кошельки"
                icon="pi pi-wallet" />

             <content-body>
                <wallets-table
                    @edit="openUpdateWalletDialog"
                    @remove="deleteWalletAction"
                    :wallets="wallets" />
             </content-body>
        </content-container>
    </page-layout>
</template>

<script setup lang="ts">
import PageLayout from '@/admin/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import ContentBody from '@/shared/components/layout/content/ContentBody.vue';
import TableContentHeader from '@/admin/components/layout/content/TableContentHeader.vue';
import WalletsTable from '@/admin/components/wallets/WalletsTable.vue';
import CreateWalletRecordDialog from '@/admin/components/wallets/dialog/CreateWalletDialog.vue';
import UpdateWalletRecordDialog from '@/admin/components/wallets/dialog/UpdateWalletDialog.vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { useWalletsStore } from '@/admin/stores';
import { useApiAction } from '@/admin/components/api/action';
import type { Wallet } from '@/admin/stores/wallets/types';

const { wallets } = storeToRefs(useWalletsStore());
const { loadWallets, createWallet, updateWallet, deleteWallet } = useWalletsStore();

const createWalletAction = useApiAction(createWallet, () => {
    createWalletDialogVisible.value = false;
});
const updateWalletAction = useApiAction(updateWallet, () => {
    editingWalletId.value = null;
});
const deleteWalletAction = useApiAction(deleteWallet);

const createWalletDialogVisible = ref(false);
const editingWalletId = ref<Wallet['id'] | null>(null);

useViewHelper(loadWallets);

function openCreateWalletDialog () {
    createWalletDialogVisible.value = true;
}

function openUpdateWalletDialog (walletId: Wallet['id']) {
    editingWalletId.value = walletId;
}
</script>
