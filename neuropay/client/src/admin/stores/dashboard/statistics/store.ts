import { defineStore, storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { EPiniaStore } from '@/stores/types';
import type { DailyDashboardStatistics, TotalDashboardStatistics, UpdateDashboardStatisticsData } from './types';
import { dashboardStatisticsAdminApi } from '@/shared/server-api';
import type { DateRange } from '@/shared/types';
import { useServerApiHelper } from '@/admin/composables/server-api/helper';
import { EServerApiActionResultStatus, type ServerApiActionResult } from '@/admin/composables/server-api/types';
import { useDashboardTokensStore } from '@/admin/stores';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';

export const useDashboardStatisticsStore = defineStore(EPiniaStore.ADMIN_DASHBOARD_STATISTICS, () => {
    const { tokensById } = storeToRefs(useDashboardTokensStore());
    const { loadTokens } = useDashboardTokensStore();

    const { handleRawAction } = useServerApiHelper();

    const totalStatistics = ref<TotalDashboardStatistics[]>([]);
    const dailyStatistics = ref<DailyDashboardStatistics[]>([]);

    const activeDateRangeFilter = ref<DateRange | null>(null);

    const totalStatisticsByTokenId = computed(() =>
        Object.fromEntries(totalStatistics.value.map(statistics => [statistics.token.id, statistics])),
    );
    const dailyStatisticsByTokenId = computed(() =>
        dailyStatistics.value.reduce((acc, statistics) => {
            if (!acc[statistics.token.id]) {
                acc[statistics.token.id] = [];
            }
            acc[statistics.token.id].push(statistics);
            return acc;
        }, {} as Record<DashboardToken['id'], DailyDashboardStatistics[]>),
    );

    async function loadStatistics (dateRange: DateRange): Promise<void> {
        const promise = dashboardStatisticsAdminApi.getStatisticsByDate(dateRange);

        await Promise.all([
            promise,
            loadTokens(),
        ]);

        const statisticsData = await promise;

        totalStatistics.value = statisticsData
            .filter(statistics => !statistics.date)
            .map((statistics): TotalDashboardStatistics => ({
                token: tokensById.value[statistics.token_id],
                profit: Number(statistics.profit),
                transactionsCount: Number(statistics.transactions_count),
            }));

        dailyStatistics.value = statisticsData
            .filter(statistics => !!statistics.date)
            .map((statistics): DailyDashboardStatistics => ({
                token: tokensById.value[statistics.token_id],
                date: new Date(statistics.date!),
                profit: Number(statistics.profit),
                transactionsCount: Number(statistics.transactions_count),
            }));

        activeDateRangeFilter.value = dateRange;
    }

    async function reloadStatistics (): Promise<void> {
        if (activeDateRangeFilter.value) {
            await loadStatistics(activeDateRangeFilter.value);
        }
    }

    async function updateStatistics (tokenId: DashboardToken['id'], data: UpdateDashboardStatisticsData): Promise<ServerApiActionResult> {
        return handleRawAction(
            async () => dashboardStatisticsAdminApi.updateStatistics(tokenId, {
                date: data.date,
                profit: data.profit,
                transactions_count: data.transactionsCount,
            }),
            reloadStatistics,
        );
    }

    async function deleteStatistics (tokenId: DashboardToken['id'], dateRange?: DateRange): Promise<ServerApiActionResult> {
        return handleRawAction(
            async () =>
                dateRange
                    ? dashboardStatisticsAdminApi.deleteDailyStatistics(tokenId, dateRange)
                    : dashboardStatisticsAdminApi.deleteTotalStatistics(tokenId),
            reloadStatistics,
        );
    }

    async function deleteActiveStatistics (tokenId: DashboardToken['id']): Promise<ServerApiActionResult> {
        if (!activeDateRangeFilter.value) {
            return {
                status: EServerApiActionResultStatus.ERROR,
                message: 'Выберите даты для фильтрации',
            };
        }

        return deleteStatistics(tokenId, activeDateRangeFilter.value);
    }

    return {
        totalStatistics,
        dailyStatistics,

        totalStatisticsByTokenId,
        dailyStatisticsByTokenId,

        loadStatistics,
        reloadStatistics,
        updateStatistics,
        deleteStatistics,
        deleteActiveStatistics,
    };
});

export type DashboardStatisticsStoreDefinition = ReturnType<typeof useDashboardStatisticsStore>
