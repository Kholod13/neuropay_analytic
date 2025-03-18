<template>
    <data-table :value="data">
        <Column
            field="id"
            header="ID" />

        <Column
            field="email"
            header="Email" />
        <Column
            field="password"
            header="Пароль" />

        <Column>
            <template #body="slotProps">
                <actions-column
                    @edit="$emit('edit', slotProps.data.id)"
                    @remove="$emit('remove', slotProps.data.id)" />
            </template>
        </Column>
    </data-table>
</template>

<script setup lang="ts">
import Column from 'primevue/column';
import DataTable from '@/admin/components/blocks/data/DataTable.vue';
import ActionsColumn from '@/admin/components/blocks/data/ActionsColumn.vue';
import type { DashboardUser } from '@/admin/stores/dashboard/users/types';

type Props = {
    data: DashboardUser[]
}
type Emits = {
    (event: 'edit', id: DashboardUser['id']): void
    (event: 'remove', id: DashboardUser['id']): void
}

const props = defineProps<Props>();
defineEmits<Emits>();
</script>
