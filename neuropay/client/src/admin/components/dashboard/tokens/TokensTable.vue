<template>
    <data-table
        :value="tokens"
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
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import type { DataColumnProps } from '@/admin/components/blocks/data/types';

type Props = {
    tokens: DashboardToken[]
}
type Emits = {
    (event: 'edit', tokenId: DashboardToken['id']): void
    (event: 'remove', tokenId: DashboardToken['id']): void
}

defineProps<Props>();
defineEmits<Emits>();

const columns: DataColumnProps<keyof DashboardToken>[] = [
    {
        field: 'id',
        header: 'ID',
    },
    {
        field: 'token',
        header: 'Токен',
    },
    {
        field: 'securityDeposit',
        header: 'Страховой депозит',
    },
    {
        field: 'workingDeposit',
        header: 'Рабочий депозит',
    },
    {
        field: 'frozenDeposit',
        header: 'Замороженный депозит',
    },
    {
        field: 'rate',
        header: 'Ставка %',
    },
    {
        field: 'currency',
        header: 'Валюта',
    },
];
</script>
