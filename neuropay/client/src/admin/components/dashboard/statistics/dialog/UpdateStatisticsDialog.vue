<template>
    <record-dialog
        @submit="$emit('submit', $event)"
        v-model:visible="visible"
        :header="UPDATE_DATA_RECORD_DIALOG_HEADER"
        :data="editingData"
        :active-token-id="activeTokenId"
        :daily="daily" />
</template>

<script setup lang="ts">
import RecordDialog from './StatisticsRecordDialog.vue';
import { computed } from 'vue';
import { UPDATE_DATA_RECORD_DIALOG_HEADER } from '@/admin/components/blocks/dialog/constants';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import type { UpdateDashboardStatisticsData } from '@/admin/stores/dashboard/statistics/types';

type Props = {
    activeTokenId: DashboardToken['id'] | null
    daily: boolean
}
type Emits = {
    (event: 'submit', payload: UpdateDashboardStatisticsData): void
}

const editingData = defineModel<UpdateDashboardStatisticsData | null>('data', { required: true });

const emit = defineEmits<Emits>();
defineProps<Props>();

const visible = computed<boolean>({
    get: () => !!editingData.value,
    set: (value: boolean) => {
        if (!value) {
            editingData.value = null;
        }
    },
});
</script>
