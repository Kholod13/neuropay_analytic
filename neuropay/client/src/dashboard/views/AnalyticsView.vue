<template>
    <page-layout>
        <content-container>
            <content-header
                title="Аналитика"
                icon="pi pi-chart-bar">
                <template #actions>
                    <analytics-filters-popover>
                        <app-button
                            label="Рассчитать"
                            severity="primary"
                            :type="EButtonType.BUTTON" />
                    </analytics-filters-popover>
                </template>
            </content-header>

            <content-body secondary>
                <div>Нет данных 999</div>
            </content-body>
        </content-container>
    </page-layout>
</template>

<script lang="ts" setup>
import PageLayout from '@/dashboard/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import ContentHeader from '@/shared/components/layout/content/ContentHeader.vue';
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import ContentBody from '@/shared/components/layout/content/ContentBody.vue';
import AnalyticsFiltersPopover from '@/dashboard/components/analytics/AnalyticsFiltersPopover.vue';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { EButtonType } from '@/shared/components/blocks/form/types';

useViewHelper();
</script>
