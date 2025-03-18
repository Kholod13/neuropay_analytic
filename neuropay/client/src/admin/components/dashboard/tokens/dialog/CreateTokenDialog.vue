<template>
    <record-dialog
        @submit="$emit('submit', $event)"
        v-model:visible="visible"
        :header="CREATE_DATA_RECORD_DIALOG_HEADER" />
</template>

<script setup lang="ts">
import RecordDialog from './TokenRecordDialog.vue';
import { CREATE_DATA_RECORD_DIALOG_HEADER } from '@/admin/components/blocks/dialog/constants';
import type { DashboardTokenData } from '@/admin/stores/dashboard/tokens/types';

type Emits = {
    (event: 'submit', data: DashboardTokenData): void
}

const visible = defineModel<boolean>('visible', { required: true });

defineEmits<Emits>();
</script>
