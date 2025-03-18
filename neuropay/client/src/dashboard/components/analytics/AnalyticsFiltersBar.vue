<template>
    <content-bar>
        <div class="container">
            <div class="filters">
                <analytics-filters
                    v-model:from-date="fromDate"
                    v-model:to-date="toDate" />
            </div>

            <app-button
                label="Рассчитать"
                severity="primary"
                :type="EButtonType.BUTTON" />
        </div>
    </content-bar>
</template>

<script setup lang="ts">
import ContentBar from '@/shared/components/layout/content/ContentBar.vue';
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import AnalyticsFilters from '@/dashboard/components/analytics/AnalyticsFilters.vue';
import { ref } from 'vue';
import { EButtonType } from '@/shared/components/blocks/form/types';

const fromDate = ref<Date | null>(null);
const toDate = ref<Date | null>(null);
</script>

<style scoped>
.container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem 2rem;
}

.filters {
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>
