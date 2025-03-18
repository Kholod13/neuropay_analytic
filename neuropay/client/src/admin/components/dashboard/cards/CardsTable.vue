<template>
    <data-table
        @toggle-group="toggleGroup"
        v-model:expanded-row-groups="expandedRowGroups"
        :value="rows"
        :pt="{
            rowGroupHeaderCell: {
                colspan: '6',
            },
        }"
        group-rows-by="tokenId"
        row-group-mode="subheader"
        expandable-row-groups>
        <template #groupheader="slotProps">
            {{ slotProps.data.token }}
        </template>
        <template #groupHeaderActions="slotProps">
            <actions-column
                @remove="$emit('remove-token-cards', slotProps.data.tokenId)"
                :can-edit="false"
                :can-add="false" />
        </template>

        <Column
            field="externalId"
            header="ID" />
        <Column
            field="bank"
            header="Банк" />
        <Column
            field="cardNumber"
            header="Номер карты" />
        <Column
            field="phoneNumber"
            header="Телефон" />
        <Column
            field="accountNumber"
            header="Номер счёта" />

        <Column>
            <template #body="slotProps">
                <actions-column
                    @remove="$emit('remove-card', slotProps.data.id)"
                    :can-edit="false" />
            </template>
        </Column>
    </data-table>
</template>

<script lang="ts" setup>
import Column from 'primevue/column';
import DataTable from '@/admin/components/blocks/data/DataTable.vue';
import ActionsColumn from '@/admin/components/blocks/data/ActionsColumn.vue';
import { computed, ref } from 'vue';
import { omit } from 'lodash-es';
import type { CardRow } from './types';
import type { DashboardCard } from '@/admin/stores/dashboard/cards/types';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';

type Props = {
    cards: DashboardCard[]
}
type Emits = {
    (event: 'remove-card', id: DashboardCard['id']): void
    (event: 'remove-token-cards', tokenId: DashboardToken['id']): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const expandedRowGroups = ref<DashboardToken['id'][]>([]);

const rows = computed((): CardRow[] => props.cards.map(card => ({
    ...omit(card, ['token', 'bank']),
    tokenId: card.token.id,
    token: card.token.token,
    bank: card.bank.name,
})));

function toggleGroup (row: CardRow): void {
    const index = expandedRowGroups.value.indexOf(row.tokenId);

    if (index === -1) {
        expandedRowGroups.value.push(row.tokenId);
    } else {
        expandedRowGroups.value.splice(index, 1);
    }
}
</script>
