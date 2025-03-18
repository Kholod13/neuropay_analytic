<template>
    <data-table
        @toggle-group="toggleGroup"
        v-model:expanded-row-groups="expandedRowGroups"
        :value="rows"
        :pt="{
            rowGroupHeaderCell: {
                colspan: '4',
            },
        }"
        group-rows-by="tokenId"
        row-group-mode="subheader"
        expandable-row-groups>
        <template #groupheader="slotProps">
            {{ slotProps.data.token ?? 'По умолчанию' }}
        </template>
        <template #groupHeaderActions="slotProps">
            <actions-column
                @add="$emit('add', slotProps.data.tokenId)"
                @remove="removeAll(slotProps.data)"
                :can-add="true"
                :can-edit="false"
                :can-remove="!!slotProps.data.tokenId" />
        </template>

        <Column
            field="id"
            header="ID" />
        <Column
            field="bank"
            header="Банк" />
        <Column
            field="sortOrder"
            header="Порядок" />

        <Column>
            <template #body="slotProps">
                <actions-column
                    @edit="$emit('edit', slotProps.data.id)"
                    @remove="$emit('remove', slotProps.data.id)" />
            </template>
        </Column>
    </data-table>
</template>

<script lang="ts" setup>
import Column from 'primevue/column';
import DataTable from '@/admin/components/blocks/data/DataTable.vue';
import ActionsColumn from '@/admin/components/blocks/data/ActionsColumn.vue';
import { computed, ref } from 'vue';
import type { DashboardBankRow } from './types';
import type { DashboardBank } from '@/admin/stores/dashboard/banks/types';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';

type Props = {
    data: DashboardBank[]
}
type Emits = {
    (event: 'add', tokenId: DashboardToken['id'] | null): void
    (event: 'edit', id: DashboardBank['id']): void
    (event: 'remove', id: DashboardBank['id']): void
    (event: 'remove-all', tokenId: DashboardToken['id']): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const expandedRowGroups = ref<DashboardBankRow['tokenId'][]>([null]);

const rows = computed((): DashboardBankRow[] => props.data.map(bank => ({
    id: bank.id,
    tokenId: bank.token?.id ?? null,
    token: bank.token?.token ?? null,
    bankId: bank.bank.id,
    bank: bank.bank.name,
    sortOrder: bank.sortOrder,
})));

function toggleGroup (row: DashboardBankRow): void {
    const index = expandedRowGroups.value.indexOf(row.tokenId);

    if (index === -1) {
        expandedRowGroups.value.push(row.tokenId);
    } else {
        expandedRowGroups.value.splice(index, 1);
    }
}

function removeAll (row: DashboardBankRow): void {
    if (row.tokenId) {
        emit('remove-all', row.tokenId);
    }
}
</script>
