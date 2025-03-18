<template>
    <wallet-record-dialog
        @submit="submit"
        v-model:visible="visible"
        :header="UPDATE_DATA_RECORD_DIALOG_HEADER"
        :wallet-address="record?.address" />
</template>

<script setup lang="ts">
import WalletRecordDialog from './WalletRecordDialog.vue';
import { storeToRefs } from 'pinia';
import { UPDATE_DATA_RECORD_DIALOG_HEADER } from '@/admin/components/blocks/dialog/constants';
import type { Wallet } from '@/admin/stores/wallets/types';
import type { UpdateDataRecordPayload } from '@/admin/components/blocks/dialog/types';
import { useUpdateDataRecordDialog } from '@/admin/components/blocks/dialog/updateDataRecordDialog';
import { useWalletsStore } from '@/admin/stores';

type Emits = {
    (event: 'submit', payload: UpdateDataRecordPayload<Wallet['address']>): void
}

const walletId = defineModel<Wallet['id'] | null>('walletId', { required: true });

const emit = defineEmits<Emits>();

const { walletsById } = storeToRefs(useWalletsStore());

const { visible, record, submit } = useUpdateDataRecordDialog(walletId, walletsById, emit);
</script>
