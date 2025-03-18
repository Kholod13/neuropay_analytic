<template>
    <record-dialog
        @submit="$emit('submit', $event)"
        v-model:visible="visible"
        :active-token-id="activeTokenId"
        :header="CREATE_DATA_RECORD_DIALOG_HEADER"
        :daily="daily" />
</template>

<script setup lang="ts">
import RecordDialog from './StatisticsRecordDialog.vue';
import { CREATE_DATA_RECORD_DIALOG_HEADER } from '@/admin/components/blocks/dialog/constants';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import type { UpdateDashboardStatisticsData } from '@/admin/stores/dashboard/statistics/types';

type Props = {
    activeTokenId: DashboardToken['id'] | null
    daily: boolean
}
type Emits = {
    (event: 'submit', data: UpdateDashboardStatisticsData): void
}

const visible = defineModel<boolean>('visible', { required: true });

defineProps<Props>();
defineEmits<Emits>();
</script>
