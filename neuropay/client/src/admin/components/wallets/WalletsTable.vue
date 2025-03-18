<template>
    <data-table
        :value="wallets"
        :columns="columns">
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
import type { Wallet } from '@/admin/stores/wallets/types';
import type { DataColumnProps } from '@/admin/components/blocks/data/types';

type Props = {
    wallets: Wallet[]
}
type Emits = {
    (event: 'edit', walletId: Wallet['id']): void
    (event: 'remove', walletId: Wallet['id']): void
}

defineProps<Props>();
defineEmits<Emits>();

const columns: DataColumnProps<keyof Wallet>[] = [
    {
        field: 'id',
        header: 'ID',
    },
    {
        field: 'address',
        header: 'Адрес',
    },
];
</script>
