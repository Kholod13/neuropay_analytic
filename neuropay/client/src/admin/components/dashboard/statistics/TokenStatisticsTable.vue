<template>
    <data-table
        :value="rows"
        data-key="date">
        <Column
            field="date"
            header="Дата">
            <template #body="slotProps">
                {{ getDateFieldOutput(slotProps.data) }}
            </template>
        </Column>

        <Column
            field="profit"
            header="Прибыль (USDT)">
            <template #body="slotProps">
                {{ getKpiValueOutput(slotProps.data.profit, true) }}
            </template>
        </Column>

        <Column
            field="transactionsCount"
            header="Кол-во сделок">
            <template #body="slotProps">
                {{ getKpiValueOutput(slotProps.data.transactionsCount, false) }}
            </template>
        </Column>

        <Column>
            <template #body="slotProps">
                <actions-column
                    @add="$emit('add')"
                    @edit="$emit('edit', slotProps.data.date)"
                    @remove="$emit('remove', slotProps.data.date)"
                    :can-add="isTotalStatisticsRow(slotProps.data) && !total"
                    :can-edit="!isTotalStatisticsRow(slotProps.data) || !!total"
                    :can-remove="!isTotalStatisticsRow(slotProps.data) || !!total" />
            </template>
        </Column>
    </data-table>
</template>

<script setup lang="ts">
import Column from 'primevue/column';
import DataTable from '@/admin/components/blocks/data/DataTable.vue';
import ActionsColumn from '@/admin/components/blocks/data/ActionsColumn.vue';
import { computed } from 'vue';
import type { TokenStatisticsRow } from './types';
import type { DailyDashboardStatistics, TotalDashboardStatistics } from '@/admin/stores/dashboard/statistics/types';
import { getDateLabel } from '@/shared/utils/dateUtils';
import { isValue } from '@/shared/utils/typeUtils';

type Props = {
    total: TotalDashboardStatistics | null
    daily: DailyDashboardStatistics[]
}
type Emits = {
    (event: 'add'): void
    (event: 'edit', date?: Date): void
    (event: 'remove', date?: Date): void
}

const props = defineProps<Props>();
defineEmits<Emits>();

const rows = computed((): TokenStatisticsRow[] => [
    {
        profit: props.total?.profit,
        transactionsCount: props.total?.transactionsCount,
    },
    ...props.daily.map(day => ({
        date: day.date,
        profit: day.profit,
        transactionsCount: day.transactionsCount,
    })),
]);

function isTotalStatisticsRow (row: TokenStatisticsRow): boolean {
    return !row.date;
}

function getDateFieldOutput (row: TokenStatisticsRow): string {
    return isTotalStatisticsRow(row) ? 'Всё время' : getDateLabel(row.date);
}

function getKpiValueOutput (value: number | undefined, float: boolean): string {
    return isValue(value)
        ? float ? value.toFixed(2) : value.toString()
        : '-';
}
</script>
