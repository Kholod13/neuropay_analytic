<template>
    <record-dialog
        @submit="submit"
        v-model:visible="visible"
        :header="UPDATE_DATA_RECORD_DIALOG_HEADER"
        :data="record" />
</template>

<script setup lang="ts">
import RecordDialog from './TokenRecordDialog.vue';
import { storeToRefs } from 'pinia';
import { UPDATE_DATA_RECORD_DIALOG_HEADER } from '@/admin/components/blocks/dialog/constants';
import type { DashboardToken, DashboardTokenData } from '@/admin/stores/dashboard/tokens/types';
import type { UpdateDataRecordPayload } from '@/admin/components/blocks/dialog/types';
import { useUpdateDataRecordDialog } from '@/admin/components/blocks/dialog/updateDataRecordDialog';
import { useDashboardTokensStore } from '@/admin/stores';

type Emits = {
    (event: 'submit', payload: UpdateDataRecordPayload<DashboardTokenData>): void
}

const recordId = defineModel<DashboardToken['id'] | null>('id', { required: true });

const emit = defineEmits<Emits>();

const { tokensById } = storeToRefs(useDashboardTokensStore());

const { visible, record, submit } = useUpdateDataRecordDialog(recordId, tokensById, emit);
</script>
