<template>
    <record-dialog
        @submit="$emit('submit', $event)"
        v-model:visible="visible"
        v-model:active-token-id="activeTokenId"
        :header="CREATE_DATA_RECORD_DIALOG_HEADER"
        token-editable />
</template>

<script setup lang="ts">
import RecordDialog from './BankRecordDialog.vue';
import { CREATE_DATA_RECORD_DIALOG_HEADER } from '@/admin/components/blocks/dialog/constants';
import type { DashboardBankPayload } from './types';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';

type Emits = {
    (event: 'submit', payload: DashboardBankPayload): void
}

const visible = defineModel<boolean>('visible', { required: true });
const activeTokenId = defineModel<DashboardToken['id'] | null>('activeTokenId', { required: true });

defineEmits<Emits>();
</script>
