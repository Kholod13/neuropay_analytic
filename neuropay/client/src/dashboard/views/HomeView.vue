<template>
    <page-layout>
        <content-container>
            <content-body
                class="info-items-container"
                secondary>
                <currency-info-item
                    label="Текущий баланс"
                    :value="workingDeposit"
                    :currency="USER_BALANCE_CURRENCY" />
                <currency-info-item
                    label="Прибыль за сегодня"
                    :value="todayKpi.profit"
                    :currency="USER_BALANCE_CURRENCY" />
                <currency-info-item
                    label="Валюта"
                    :currency="currency" />
                <info-item
                    label="Сделок сегодня"
                    :value="todayKpi.transactionsCount" />
            </content-body>

            <content-body secondary>
                <daily-profit-chart />
            </content-body>
        </content-container>
    </page-layout>
</template>

<script setup lang="ts">
import PageLayout from '@/dashboard/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import ContentBody from '@/shared/components/layout/content/ContentBody.vue';
import InfoItem from '@/shared/components/blocks/InfoItem.vue';
import CurrencyInfoItem from '@/shared/components/blocks/CurrencyInfoItem.vue';
import DailyProfitChart from '@/dashboard/components/statistics/DailyProfitChart.vue';
import { storeToRefs } from 'pinia';
import { useStatisticsStore, useUserStore } from '@/dashboard/stores';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { USER_BALANCE_CURRENCY } from '@/dashboard/constants';

const { workingDeposit, currency } = storeToRefs(useUserStore());

const { loadStatistics } = useStatisticsStore();
const { todayKpi } = storeToRefs(useStatisticsStore());

useViewHelper(loadStatistics);
</script>

<style scoped>
.info-items-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
}

@media (max-width: 768px) {
    .info-items-container {
        grid-gap: .5rem;
    }
}
</style>
