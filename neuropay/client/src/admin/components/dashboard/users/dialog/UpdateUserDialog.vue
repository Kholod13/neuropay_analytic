<template>
    <record-dialog
        @submit="submit"
        v-model:visible="visible"
        :header="UPDATE_DATA_RECORD_DIALOG_HEADER"
        :data="record"
        :active-token-id="record?.tokenId ?? null" />
</template>

<script setup lang="ts">
import RecordDialog from './UserRecordDialog.vue';
import { UPDATE_DATA_RECORD_DIALOG_HEADER } from '@/admin/components/blocks/dialog/constants';
import type { DashboardUser, DashboardUserData } from '@/admin/stores/dashboard/users/types';
import { storeToRefs } from 'pinia';
import { useDashboardUsersStore } from '@/admin/stores';
import { useUpdateDataRecordDialog } from '@/admin/components/blocks/dialog/updateDataRecordDialog';
import type { UpdateDataRecordPayload } from '@/admin/components/blocks/dialog/types';

type Emits = {
    (event: 'submit', data: UpdateDataRecordPayload<DashboardUserData>): void
}

const editingId = defineModel<DashboardUser['id'] | null>('id', { required: true });

const emit = defineEmits<Emits>();

const { usersById } = storeToRefs(useDashboardUsersStore());

const { visible, record, submit } = useUpdateDataRecordDialog(editingId, usersById, emit);
</script>
