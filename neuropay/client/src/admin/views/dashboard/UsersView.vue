<template>
    <create-user-dialog
        @submit="createRecord"
        v-model:visible="createRecordDialogVisible"
        :active-token-id="activeTokenId" />
    <update-user-dialog
        @submit="updateRecordAction($event.id, $event.data)"
        v-model:id="editingUserId" />

    <page-layout>
        <content-container>
            <content-header
                title="Пользователи"
                icon="pi pi-users" />

            <content-body>
                <users-table
                    @add="openCreateRecordDialog"
                    @edit="openUpdateRecordDialog"
                    @remove="deleteRecordAction"
                    @remove-all="deleteAllRecordsAction"
                    :tokens="tokens" />
            </content-body>
        </content-container>
    </page-layout>
</template>

<script setup lang="ts">
import PageLayout from '@/admin/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import ContentHeader from '@/shared/components/layout/content/ContentHeader.vue';
import ContentBody from '@/shared/components/layout/content/ContentBody.vue';
import UsersTable from '@/admin/components/dashboard/users/UsersTable.vue';
import CreateUserDialog from '@/admin/components/dashboard/users/dialog/CreateUserDialog.vue';
import UpdateUserDialog from '@/admin/components/dashboard/users/dialog/UpdateUserDialog.vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { useDashboardTokensStore, useDashboardUsersStore } from '@/admin/stores';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import { useApiAction } from '@/admin/components/api/action';
import type { DashboardUser, DashboardUserData } from '@/admin/stores/dashboard/users/types';
import { useApplicationStore } from '@/shared/stores';

const { tokens } = storeToRefs(useDashboardTokensStore());

const { loadTokens } = useDashboardTokensStore();
const {
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    deleteAllUsers,
} = useDashboardUsersStore();

const { wrapLoading } = useApplicationStore();

const createRecordDialogVisible = ref(false);

const editingUserId = ref<DashboardUser['id'] | null>(null);
const activeTokenId = ref<DashboardToken['id'] | null>(null);

const createRecordAction = useApiAction(createUser, () => {
    createRecordDialogVisible.value = false;
});
const updateRecordAction = useApiAction(updateUser, () => {
    editingUserId.value = null;
});
const deleteRecordAction = useApiAction(deleteUser);
const deleteAllRecordsAction = useApiAction(deleteAllUsers);

useViewHelper(loadData);

async function loadData (): Promise<void> {
    await Promise.all([
        loadTokens(),
        loadUsers(),
    ]);
}

function openCreateRecordDialog (tokenId: DashboardToken['id']): void {
    activeTokenId.value = tokenId;
    createRecordDialogVisible.value = true;
}

async function openUpdateRecordDialog (id: DashboardUser['id']): Promise<void> {
    await wrapLoading(loadData);

    editingUserId.value = id;
}

async function createRecord (data: DashboardUserData): Promise<void> {
    if (!activeTokenId.value) {
        return;
    }

    await createRecordAction(activeTokenId.value, data);
}
</script>
