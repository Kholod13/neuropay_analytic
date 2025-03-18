<template>
    <DataTable v-bind="{ ...$props, ...$attrs }">
        <template #empty>
            <div>Нет данных</div>
        </template>

        <template
            v-if="$slots.groupheader"
            #groupheader="slotProps">
            <div class="group-header-wrapper">
                 <div class="group-header-container">
                     <div
                        @click="$emit('toggle-group', slotProps.data)"
                        class="group-header">
                        <slot
                            v-bind="slotProps"
                            name="groupheader" />
                    </div>

                    <div
                        v-if="$slots.groupHeaderActions"
                        class="group-header-actions">
                        <slot
                            v-bind="slotProps"
                            name="groupHeaderActions" />
                    </div>
                 </div>
            </div>
        </template>

        <template #expansion="slotProps">
            <slot
                v-bind="slotProps"
                name="expansion" />
        </template>

        <Column
            v-if="$slots.expansion"
            expander
            style="width: 5rem" />

        <Column
            v-for="column in columns"
            :key="column.field"
            v-bind="column" />

        <slot />
    </DataTable>
</template>

<script setup lang="ts">
import DataTable, { type DataTableProps } from 'primevue/datatable';
import Column from 'primevue/column';
import type { DataColumnProps } from './types';

type Props = DataTableProps & {
    columns?: DataColumnProps[]
}
type Emits = {
    (event: 'toggle-group', row: any): void
}

withDefaults(defineProps<Props>(), {
    dataKey: 'id',
    showHeaders: true,

    columns: () => [],
});
defineEmits<Emits>();
</script>

<style scoped>
.group-header-wrapper {
    display: inline-block;
    padding-left: 1rem;
    width: calc(100% - var(--p-datatable-row-toggle-button-size));
}

.group-header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.group-header {
    cursor: pointer;
    font-weight: bold;
    font-size: 1.2rem;
}
</style>
