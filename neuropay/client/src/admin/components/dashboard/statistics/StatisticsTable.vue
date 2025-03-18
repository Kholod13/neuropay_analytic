<template>
    <data-table
        v-model:expanded-rows="expandedRows"
        :value="tokens">
        <Column
            field="token"
            header="Токен">
            <template #body="slotProps">
                <span
                    @click="toggleExpanded(slotProps.data)"
                    class="cursor-pointer font-bold">{{ slotProps.data.token }}</span>
            </template>
        </Column>

        <Column>
            <template #body="slotProps">
                <actions-column
                    @add="$emit('add', { tokenId: slotProps.data.id, daily: true })"
                    @remove="$emit('remove-all', slotProps.data.id)"
                    :can-add="true"
                    :can-edit="false"
                    :can-remove="hasStatistics(slotProps.data.id)" />
            </template>
        </Column>

        <template #expansion="slotProps">
            <token-statistics-table
                @add="$emit('add', { tokenId: slotProps.data.id, daily: false })"
                @edit="$emit('edit', { tokenId: slotProps.data.id, date: $event })"
                @remove="$emit('remove', { tokenId: slotProps.data.id, date: $event })"
                :total="totalStatisticsByTokenId[slotProps.data.id] ?? null"
                :daily="dailyStatisticsByTokenId[slotProps.data.id] ?? []" />
        </template>
    </data-table>
</template>

<script setup lang="ts">
import Column from 'primevue/column';
import DataTable from '@/admin/components/blocks/data/DataTable.vue';
import ActionsColumn from '@/admin/components/blocks/data/ActionsColumn.vue';
import TokenStatisticsTable from './TokenStatisticsTable.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import type { RemoveStatisticsPayload, EditStatisticsPayload, AddStatisticsPayload } from './types';
import { useDashboardStatisticsStore } from '@/admin/stores';

type Props = {
    tokens: DashboardToken[]
}
type Emits = {
    (event: 'add', payload: AddStatisticsPayload): void
    (event: 'edit', payload: EditStatisticsPayload): void
    (event: 'remove', payload: RemoveStatisticsPayload): void
    (event: 'remove-all', tokenId: DashboardToken['id']): void
}

defineProps<Props>();
defineEmits<Emits>();

const { totalStatisticsByTokenId, dailyStatisticsByTokenId } = storeToRefs(useDashboardStatisticsStore());

const expandedRows = ref<Record<DashboardToken['id'], boolean>>({});

function hasStatistics (tokenId: DashboardToken['id']): boolean {
    return !!totalStatisticsByTokenId.value[tokenId] || !!dailyStatisticsByTokenId.value[tokenId];
}

function toggleExpanded (token: DashboardToken): void {
    if (expandedRows.value[token.id]) {
        delete expandedRows.value[token.id];
        return;
    }

    expandedRows.value[token.id] = true;
}
</script>
