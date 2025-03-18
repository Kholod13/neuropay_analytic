<template>
    <record-dialog
        @submit="$emit('submit', $event)"
        v-model:visible="visible"
        :header="UPDATE_DATA_RECORD_DIALOG_HEADER"
        :data="editingData"
        :active-token-id="activeTokenId"
        :content-key-editable="false"
        :token-editable="false" />
</template>

<script setup lang="ts">
import RecordDialog from './ContentsRecordDialog.vue';
import { computed } from 'vue';
import { UPDATE_DATA_RECORD_DIALOG_HEADER } from '@/admin/components/blocks/dialog/constants';
import type { DynamicContentData } from '@/admin/stores/dashboard/contents/types';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';

type Props = {
    activeTokenId: DashboardToken['id'] | null
}
type Emits = {
    (event: 'submit', payload: DynamicContentData): void
}

const editingData = defineModel<DynamicContentData | null>('data', { required: true });

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
