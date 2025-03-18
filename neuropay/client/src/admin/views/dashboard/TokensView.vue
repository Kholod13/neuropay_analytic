<template>
    <create-token-dialog
        @submit="createRecordAction"
        v-model:visible="createRecordDialogVisible" />
    <update-token-dialog
        @submit="updateRecordAction($event.id, $event.data)"
        v-model:id="editingRecordId" />

    <page-layout>
        <content-container>
            <table-content-header
                @create="openCreateRecordDialog"
                title="Токены"
                icon="pi pi-bitcoin" />

             <content-body>
                <tokens-table
                    @edit="openUpdateRecordDialog"
                    @remove="deleteRecordAction"
                    :tokens="tokens" />
             </content-body>
        </content-container>
    </page-layout>
</template>

<script setup lang="ts">
import PageLayout from '@/admin/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import TableContentHeader from '@/admin/components/layout/content/TableContentHeader.vue';
import ContentBody from '@/shared/components/layout/content/ContentBody.vue';
import TokensTable from '@/admin/components/dashboard/tokens/TokensTable.vue';
import CreateTokenDialog from '@/admin/components/dashboard/tokens/dialog/CreateTokenDialog.vue';
import UpdateTokenDialog from '@/admin/components/dashboard/tokens/dialog/UpdateTokenDialog.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { useDashboardTokensStore, useWalletsStore } from '@/admin/stores';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import { useApplicationStore } from '@/shared/stores';
import { useApiAction } from '@/admin/components/api/action';

const { loadWallets } = useWalletsStore();
const {
    loadTokens,
    createToken,
    updateToken,
    deleteToken,
} = useDashboardTokensStore();

const { wrapLoading } = useApplicationStore();

const { tokens } = storeToRefs(useDashboardTokensStore());

const createRecordDialogVisible = ref(false);
const editingRecordId = ref<DashboardToken['id'] | null>(null);

const createRecordAction = useApiAction(createToken, () => {
    createRecordDialogVisible.value = false;
});
const updateRecordAction = useApiAction(updateToken, () => {
    editingRecordId.value = null;
});
const deleteRecordAction = useApiAction(deleteToken);

useViewHelper(loadData);

function openCreateRecordDialog () {
    createRecordDialogVisible.value = true;
}

async function openUpdateRecordDialog (id: DashboardToken['id']): Promise<void> {
    await wrapLoading(loadData);

    editingRecordId.value = id;
}

async function loadData (): Promise<void> {
    await Promise.all([
        loadWallets(),
        loadTokens(),
    ]);
}
</script>
