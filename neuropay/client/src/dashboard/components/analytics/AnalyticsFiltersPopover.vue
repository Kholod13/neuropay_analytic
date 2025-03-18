<template>
    <filters-popover
        @apply="apply"
        :show-reset="false">
        <template #toggle>
            <slot />
        </template>

        <filters-group>
            <template #title>Выберите диапазон</template>

            <analytics-filters
                v-model:from-date="fromDate"
                v-model:to-date="toDate"
                size="small" />
        </filters-group>
    </filters-popover>
</template>

<script lang="ts" setup>
import FiltersPopover from '@/shared/components/blocks/popover/FiltersPopover.vue';
import FiltersGroup from '@/shared/components/blocks/popover/FiltersGroup.vue';
import AnalyticsFilters from '@/dashboard/components/analytics/AnalyticsFilters.vue';
import { ref } from 'vue';
import type { UsePopoverControlsReturn } from '@/shared/components/blocks/popover/popoverControls';

const fromDate = ref<Date | null>(null);
const toDate = ref<Date | null>(null);

function apply (hide: UsePopoverControlsReturn['hide']): void {
    hide();
}
</script>
