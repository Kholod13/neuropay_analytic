<template>
    <wallet-record-dialog
        @submit="$emit('submit', $event)"
        v-model:visible="visible"
        :header="CREATE_DATA_RECORD_DIALOG_HEADER" />
</template>

<script setup lang="ts">
import WalletRecordDialog from './WalletRecordDialog.vue';
import { CREATE_DATA_RECORD_DIALOG_HEADER } from '@/admin/components/blocks/dialog/constants';

type Emits = {
    (event: 'submit', walletAddress: string): void
}

const visible = defineModel<boolean>('visible', { required: true });

defineEmits<Emits>();
</script>
