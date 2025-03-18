<template>
    <Chart
        class="chart"
        v-bind="$props" />
</template>

<script lang="ts" setup>
import Chart, { type ChartProps } from 'primevue/chart';

defineProps<ChartProps>();
</script>

<style scoped>
:global(.chart canvas) {
    width: 100% !important;
}

.chart {
    height: 100%;
    width: 100%;
}
</style>
