<template>
    <create-contents-dialog
        @submit="createRecord"
        v-model:visible="createRecordDialogVisible"
        v-model:active-token-id="activeTokenId" />
    <update-contents-dialog
        @submit="updateRecord"
        v-model:data="editingData"
        :active-token-id="activeTokenId" />

    <page-layout>
        <content-container>
            <table-content-header
                @create="openCreateRecordDialog"
                title="Контент"
                icon="pi pi-file" />

             <content-body>
                <contents-table
                    @add="openCreateRecordDialog($event.tokenId)"
                    @edit="openUpdateRecordDialog($event.key, $event.tokenId)"
                    @remove="deleteContentsAction($event.tokenId, $event.key)"
                    :default-contents="defaultContents"
                    :token-contents="tokenContents" />
             </content-body>
        </content-container>
    </page-layout>
</template>

<script setup lang="ts">
import PageLayout from '@/admin/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import ContentBody from '@/shared/components/layout/content/ContentBody.vue';
import TableContentHeader from '@/admin/components/layout/content/TableContentHeader.vue';
import ContentsTable from '@/admin/components/dashboard/contents/ContentsTable.vue';
import CreateContentsDialog from '@/admin/components/dashboard/contents/dialog/CreateContentsDialog.vue';
import UpdateContentsDialog from '@/admin/components/dashboard/contents/dialog/UpdateContentsDialog.vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { useApiAction } from '@/admin/components/api/action';
import type { DynamicContentData } from '@/admin/stores/dashboard/contents/types';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import type { DynamicContentKey } from '@/shared/server-api';
import { useApplicationStore } from '@/shared/stores';
import { useDashboardContentsStore, useDashboardTokensStore } from '@/admin/stores';
import { useToastMessage } from '@/shared/components/blocks/toast/message';
import { EMessageSeverity } from '@/shared/components/blocks/toast/types';

const { tokens } = storeToRefs(useDashboardTokensStore());
const { defaultContents, tokenContents } = storeToRefs(useDashboardContentsStore());
const { loadContents, updateContents, deleteContents } = useDashboardContentsStore();

const { wrapLoading } = useApplicationStore();

const toastMessage = useToastMessage();

const createRecordDialogVisible = ref(false);

const editingData = ref<DynamicContentData | null>(null);
const activeTokenId = ref<DashboardToken['id'] | null>(null);

const updateContentsAction = useApiAction(updateContents, () => {
    createRecordDialogVisible.value = false;
    editingData.value = null;
});
const deleteContentsAction = useApiAction(deleteContents);

useViewHelper(loadContents);

async function openCreateRecordDialog (tokenId?: DashboardToken['id']): Promise<void> {
    await wrapLoading(loadContents);

    activeTokenId.value = tokenId ?? tokens.value[0]?.id ?? null;
    createRecordDialogVisible.value = true;
}

async function openUpdateRecordDialog (key: DynamicContentKey, tokenId?: DashboardToken['id']): Promise<void> {
    await wrapLoading(loadContents);

    activeTokenId.value = tokenId ?? null;

    editingData.value = tokenId
        ? tokenContents.value.find(content => content.key === key && content.token.id === tokenId) ?? null
        : defaultContents.value.find(content => content.key === key) ?? null;
}

async function createRecord (data: DynamicContentData): Promise<void> {
    if (!activeTokenId.value) {
        await toastMessage.add({
            severity: EMessageSeverity.ERROR,
            summary: 'Ошибка',
            detail: 'Выберите токен',
        });
        return;
    }

    await updateContentsAction(data, activeTokenId.value);
}

async function updateRecord (data: DynamicContentData): Promise<void> {
    await updateContentsAction(data, activeTokenId.value ?? undefined);
}
</script>
