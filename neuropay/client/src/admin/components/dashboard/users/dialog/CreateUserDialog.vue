<template>
    <record-dialog
        @submit="$emit('submit', $event)"
        v-model:visible="visible"
        :active-token-id="activeTokenId"
        :header="CREATE_DATA_RECORD_DIALOG_HEADER" />
</template>

<script setup lang="ts">
import RecordDialog from './UserRecordDialog.vue';
import { CREATE_DATA_RECORD_DIALOG_HEADER } from '@/admin/components/blocks/dialog/constants';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import type { DashboardUserData } from '@/admin/stores/dashboard/users/types';

type Props = {
    activeTokenId: DashboardToken['id'] | null
}
type Emits = {
    (event: 'submit', data: DashboardUserData): void
}

const visible = defineModel<boolean>('visible', { required: true });

defineProps<Props>();
defineEmits<Emits>();
</script>
