import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAnalyticsStore = defineStore('analytics', () => {
    const analyticsData = ref({
        payIn: {
            totalDeals: 0,
            confirmedDeals: 0,
            canceledDeals: 0,
            revenue: 0,
            traffic: 0
        },
        payOut: {
            totalDeals: 0,
            confirmedDeals: 0,
            canceledDeals: 0,
            revenue: 0,
            traffic: 0
        }
    });

    function updateAnalytics(newData: any) {
        analyticsData.value = newData;
    }

    return { analyticsData, updateAnalytics };
});
