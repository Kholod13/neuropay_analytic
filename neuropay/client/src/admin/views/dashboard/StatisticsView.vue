<template>
    <create-statistics-dialog
        @submit="updateRecord"
        v-model:visible="createRecordDialogVisible"
        :active-token-id="activeTokenId"
        :daily="isEditingDailyStatistics" />
    <update-statistics-dialog
        @submit="updateRecord"
        v-model:data="editingData"
        :active-token-id="activeTokenId"
        :daily="isEditingDailyStatistics" />

    <page-layout>
        <content-container>
            <content-header
                title="Статистика"
                icon="pi pi-chart-bar" />

            <statistic-filters-bar
                @submit="loadStatisticsWithLoading"
                v-model:from-date="fromDate"
                v-model:to-date="toDate" />

            <content-body>
                <statistics-table
                    @add="openCreateRecordDialog($event.tokenId, $event.daily)"
                    @edit="openUpdateRecordDialog($event.tokenId, $event.date)"
                    @remove="deleteRecord($event.tokenId, $event.date)"
                    @remove-all="deleteActiveStatisticsAction"
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
import StatisticsTable from '@/admin/components/dashboard/statistics/StatisticsTable.vue';
import StatisticFiltersBar from '@/admin/components/dashboard/statistics/StatisticFiltersBar.vue';
import CreateStatisticsDialog from '@/admin/components/dashboard/statistics/dialog/CreateStatisticsDialog.vue';
import UpdateStatisticsDialog from '@/admin/components/dashboard/statistics/dialog/UpdateStatisticsDialog.vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { useDashboardStatisticsStore, useDashboardTokensStore } from '@/admin/stores';
import { useApplicationStore } from '@/shared/stores';
import type { DateRange } from '@/shared/types';
import { getDateString, getFirstDayOfMonth, getLastDayOfMonth } from '@/shared/utils/dateUtils';
import type { UpdateDashboardStatisticsData } from '@/admin/stores/dashboard/statistics/types';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import { useApiAction } from '@/admin/components/api/action';

const { tokens } = storeToRefs(useDashboardTokensStore());
const { totalStatisticsByTokenId, dailyStatisticsByTokenId } = storeToRefs(useDashboardStatisticsStore());

const {
    loadStatistics,
    reloadStatistics,
    updateStatistics,
    deleteStatistics,
    deleteActiveStatistics,
} = useDashboardStatisticsStore();

const { wrapLoading } = useApplicationStore();

const fromDate = ref<Date | null>(null);
const toDate = ref<Date | null>(null);

const createRecordDialogVisible = ref(false);

const editingData = ref<UpdateDashboardStatisticsData | null>(null);
const activeTokenId = ref<DashboardToken['id'] | null>(null);
const isEditingDailyStatistics = ref(false);

const updateStatisticsAction = useApiAction(updateStatistics, () => {
    createRecordDialogVisible.value = false;
    editingData.value = null;
});
const deleteStatisticsAction = useApiAction(deleteStatistics);
const deleteActiveStatisticsAction = useApiAction(deleteActiveStatistics);

useViewHelper(async () => {
    const dateRange: DateRange = {
        from: getFirstDayOfMonth(),
        to: getLastDayOfMonth(),
    };
    await loadStatistics(dateRange);

    fromDate.value = dateRange.from;
    toDate.value = dateRange.to;
});

async function loadStatisticsWithLoading(dateRange: DateRange): Promise<void> {
    await wrapLoading(async () => loadStatistics(dateRange));
}

async function openCreateRecordDialog (tokenId: DashboardToken['id'], daily: boolean): Promise<void> {
    activeTokenId.value = tokenId;
    isEditingDailyStatistics.value = daily;

    createRecordDialogVisible.value = true;
}

async function openUpdateRecordDialog (tokenId: DashboardToken['id'], date?: Date): Promise<void> {
    await wrapLoading(reloadStatistics);

    activeTokenId.value = tokenId;
    isEditingDailyStatistics.value = !!date;

    editingData.value = date
        ? dailyStatisticsByTokenId.value[tokenId]?.find(stat => getDateString(stat.date) === getDateString(date)) ?? null
        : totalStatisticsByTokenId.value[tokenId] ?? null;
}

async function updateRecord (data: UpdateDashboardStatisticsData): Promise<void> {
    if (!activeTokenId.value) {
        return;
    }

    await updateStatisticsAction(activeTokenId.value, data);
}

async function deleteRecord (tokenId: DashboardToken['id'], date?: Date): Promise<void> {
    await deleteStatisticsAction(tokenId, date ? {
        from: date,
        to: date,
    } : undefined);
}
</script>
