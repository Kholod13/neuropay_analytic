import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { EPiniaStore } from '@/stores/types';
import type { KPI, Statistics } from './types';
import { getStatisticsByDate, pullKpi } from './utils';
import { statisticsApi } from '@/shared/server-api';
import { getFirstDayOfMonth, getLastDayOfMonth } from '@/shared/utils/dateUtils';

export const useStatisticsStore = defineStore(EPiniaStore.DASHBOARD_STATISTICS, () => {
    const statistics = ref<Statistics[]>([]);
    const totalKpi = ref<KPI>({
        profit: 0,
        transactionsCount: 0,
    });

    const statisticsByDate = computed(() => getStatisticsByDate(statistics.value));
    const todayKpi = computed(() => getDayKpi(new Date()));

    function getDayKpi (date: Date): KPI {
        return pullKpi(date, statisticsByDate.value);
    }

    async function loadStatistics (): Promise<void> {
        const fromDate = getFirstDayOfMonth();
        const toDate = getLastDayOfMonth();

        const statisticsData = await statisticsApi.getByDateRange(fromDate, toDate);

        statistics.value = statisticsData.map(item => ({
            date: new Date(item.date),
            profit: Number(item.profit),
            transactionsCount: Number(item.transactions_count),
        }));
    }

    async function loadTotalKpi (): Promise<void> {
        const totalKpiData = await statisticsApi.getTotals();

        totalKpi.value = {
            profit: Number(totalKpiData.profit),
            transactionsCount: Number(totalKpiData.transactions_count),
        };
    }

    return {
        statistics,
        totalKpi,

        todayKpi,
        getDayKpi: computed(() => getDayKpi),

        loadStatistics,
        loadTotalKpi,
    };
});

export type StatisticsStoreDefinition = ReturnType<typeof useStatisticsStore>
