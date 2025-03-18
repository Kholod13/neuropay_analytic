<template>
    <record-dialog
        @submit="submit($event.data)"
        v-model:visible="visible"
        :active-token-id="record?.token?.id ?? null"
        :header="UPDATE_DATA_RECORD_DIALOG_HEADER"
        :data="data"
        :token-editable="false" />
</template>

<script setup lang="ts">
import RecordDialog from './BankRecordDialog.vue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { UPDATE_DATA_RECORD_DIALOG_HEADER } from '@/admin/components/blocks/dialog/constants';
import type { UpdateDataRecordPayload } from '@/admin/components/blocks/dialog/types';
import type { DashboardBank, UpdateDashboardBankData } from '@/admin/stores/dashboard/banks/types';
import { useUpdateDataRecordDialog } from '@/admin/components/blocks/dialog/updateDataRecordDialog';
import { useDashboardBanksStore } from '@/admin/stores';

type Emits = {
    (event: 'submit', payload: UpdateDataRecordPayload<UpdateDashboardBankData>): void
}

const recordId = defineModel<DashboardBank['id'] | null>('recordId', { required: true });
const emit = defineEmits<Emits>();

const { dashboardBanksById } = storeToRefs(useDashboardBanksStore());

const { visible, record, submit } = useUpdateDataRecordDialog(recordId, dashboardBanksById, emit);

const data = computed(() => record.value ? {
    name: record.value.bank.name,
    sortOrder: record.value.sortOrder,
} : null);
</script>
