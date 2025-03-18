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
                    @add="$emit('add', slotProps.data.id)"
                    @remove="$emit('remove-all', slotProps.data.id)"
                    :can-add="true"
                    :can-edit="false"
                    :can-remove="hasUsers(slotProps.data.id)" />
            </template>
        </Column>

        <template #expansion="slotProps">
            <token-users-table
                @edit="$emit('edit', $event)"
                @remove="$emit('remove', $event)"
                :data="usersByTokenId[slotProps.data.id] ?? []" />
        </template>
    </data-table>
</template>

<script setup lang="ts">
import Column from 'primevue/column';
import DataTable from '@/admin/components/blocks/data/DataTable.vue';
import ActionsColumn from '@/admin/components/blocks/data/ActionsColumn.vue';
import TokenUsersTable from './TokenUsersTable.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import { useDashboardUsersStore } from '@/admin/stores';
import type { DashboardUser } from '@/admin/stores/dashboard/users/types';

type Props = {
    tokens: DashboardToken[]
}
type Emits = {
    (event: 'add', tokenId: DashboardToken['id']): void
    (event: 'edit', id: DashboardUser['id']): void
    (event: 'remove', id: DashboardUser['id']): void
    (event: 'remove-all', tokenId: DashboardToken['id']): void
}

defineProps<Props>();
defineEmits<Emits>();

const { usersByTokenId } = storeToRefs(useDashboardUsersStore());

const expandedRows = ref<Record<DashboardToken['id'], boolean>>({});

function hasUsers (tokenId: DashboardToken['id']): boolean {
    return !!usersByTokenId.value[tokenId]?.length;
}

function toggleExpanded (token: DashboardToken): void {
    if (expandedRows.value[token.id]) {
        delete expandedRows.value[token.id];
        return;
    }

    expandedRows.value[token.id] = true;
}
</script>
