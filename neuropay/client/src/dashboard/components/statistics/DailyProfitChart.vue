<template>
    <app-chart
        type="line"
        :data="chartData"
        :options="chartOptions" />
</template>

<script setup lang="ts">
import AppChart from '@/shared/components/blocks/chart/AppChart.vue';
import { computed } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { useStatisticsStore } from '@/dashboard/stores';
import { getDateLabel, getDaysOfMonth } from '@/shared/utils/dateUtils';

const DEFAULT_SUGGESTED_MAX = 800;

const daysOfMonth = getDaysOfMonth();

const labels = daysOfMonth.map(getDateLabel);
const daysWithXLabels = [1, 5, 10, 15, 20, 25, labels.length];

const { getDayKpi } = useStatisticsStore();

const showSmallLabel = useMediaQuery('(max-width: 768px)');

const dailyProfit = computed(() => daysOfMonth.map(day => getDayKpi(day).profit));
const suggestedMax = computed(() => {
    const maxProfit = Math.max(...dailyProfit.value);
    return maxProfit > 0 ? maxProfit : DEFAULT_SUGGESTED_MAX;
});

const chartData = computed(() => ({
    labels,
    datasets: [
        {
            label: 'Прибыль (USDT)',
            data: dailyProfit.value,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false
        }
    ]
}));

const chartOptions = computed(() => ({
    scales: {
        x: {
            type: 'category',
            ticks: {
                autoSkip: false,
                maxRotation: 0,
                align: 'center',
                callback: (_: unknown, index: number) => {
                    const day = index + 1;
                    return daysWithXLabels.includes(day) ? getDayXLabel(day) : '';
                },
            }
        },
        y: {
            beginAtZero: true,
            suggestedMax: suggestedMax.value,
            ticks: {
                callback: (value: unknown, index: number) => {
                    return index % 2 === 0 ? value : '';
                },
            },
        }
    },
    plugins: {
        legend: {
            display: false,
        }
    },
    responsive: true,
    maintainAspectRatio: false,
}));

function getDayXLabel (day: number): string {
    if (showSmallLabel.value) {
        return day.toString();
    }

    return day === 1 ? '1 день' : `${day} дней`;
}
</script>
