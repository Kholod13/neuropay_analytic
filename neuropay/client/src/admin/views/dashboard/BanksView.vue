<template>
    <create-bank-dialog
        @submit="createRecordAction($event.tokenId, $event.data)"
        v-model:visible="createRecordDialogVisible"
        v-model:active-token-id="activeTokenId" />
    <update-bank-dialog
        @submit="updateRecordAction($event.id, $event.data)"
        v-model:record-id="editingRecordId" />

    <page-layout>
        <content-container>
            <table-content-header
                @create="openCreateRecordDialog(null, true)"
                title="Банки"
                icon="pi pi-building-columns" />

             <content-body>
                <banks-table
                    @add="openCreateRecordDialog($event)"
                    @edit="openUpdateRecordDialog"
                    @remove="deleteRecordAction"
                    @remove-all="deleteAllRecordsAction"
                    :data="dashboardBanks" />
             </content-body>
        </content-container>
    </page-layout>
</template>

<script setup lang="ts">
import PageLayout from '@/admin/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import ContentBody from '@/shared/components/layout/content/ContentBody.vue';
import TableContentHeader from '@/admin/components/layout/content/TableContentHeader.vue';
import BanksTable from '@/admin/components/dashboard/banks/BanksTable.vue';
import CreateBankDialog from '@/admin/components/dashboard/banks/dialog/CreateBankDialog.vue';
import UpdateBankDialog from '@/admin/components/dashboard/banks/dialog/UpdateBankDialog.vue';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { useDashboardBanksStore, useDashboardTokensStore } from '@/admin/stores';
import { useApiAction } from '@/admin/components/api/action';
import { useApplicationStore } from '@/shared/stores';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import type { DashboardBank } from '@/admin/stores/dashboard/banks/types';
import { isValue } from '@/shared/utils/typeUtils';

const { dashboardBanks } = storeToRefs(useDashboardBanksStore());
const { tokens } = storeToRefs(useDashboardTokensStore());

const { wrapLoading } = useApplicationStore();
const {
    loadDashboardBanks,
    createDashboardBank,
    updateDashboardBank,
    deleteDashboardBank,
    deleteAllDashboardBanks,
} = useDashboardBanksStore();

const createRecordDialogVisible = ref(false);

const editingRecordId = ref<DashboardBank['id'] | null>(null);
const activeTokenId = ref<DashboardToken['id'] | null>(null);

const dashboardBankTokenIds = computed<Set<DashboardToken['id']>>(() => new Set(
    dashboardBanks.value.map(bank => bank.token?.id).filter(isValue),
));
const defaultActiveTokenId = computed<DashboardToken['id'] | null>(() => {
    if (!dashboardBanks.value.length) {
        return null;
    }

    const token = tokens.value.find(token => !dashboardBankTokenIds.value.has(token.id));
    return token?.id ?? null;
});

const createRecordAction = useApiAction(createDashboardBank, () => {
    createRecordDialogVisible.value = false;
});
const updateRecordAction = useApiAction(updateDashboardBank, () => {
    editingRecordId.value = null;
});
const deleteRecordAction = useApiAction(deleteDashboardBank);
const deleteAllRecordsAction = useApiAction(deleteAllDashboardBanks);

useViewHelper(loadDashboardBanks);

async function openCreateRecordDialog (tokenId: DashboardToken['id'] | null, forceToken = false): Promise<void> {
    await wrapLoading(loadDashboardBanks);

    activeTokenId.value = tokenId ?? (forceToken ? defaultActiveTokenId.value : null);
    createRecordDialogVisible.value = true;
}

async function openUpdateRecordDialog (id: DashboardBank['id']): Promise<void> {
    await wrapLoading(loadDashboardBanks);

    editingRecordId.value = id;
}
</script>
