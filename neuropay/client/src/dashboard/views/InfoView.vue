<template>
    <page-layout secondary>
        <content-container secondary>
            <content-header
                title="Информация"
                secondary />

            <content-body
                class="info-container"
                secondary>
                <currency-info-item
                    label="Валюта"
                    :currency="currency" />
                <info-item
                    label="Ставка"
                    :value="getPercentUserOutput(rate)" />
                <info-item
                    label="Сделок за всё время"
                    :value="totalKpi.transactionsCount" />
                <currency-info-item
                    label="Прибыль за всё время"
                    :value="totalKpi.profit"
                    :currency="USER_BALANCE_CURRENCY" />
            </content-body>
        </content-container>

        <content-container secondary>
            <content-header
                title="Инструкция по использованию площадки"
                secondary />

            <content-body secondary>
                <div v-html="platformInstruction" />
            </content-body>
        </content-container>

        <content-container secondary>
            <content-header
                title="Контактная информация для поддержки"
                secondary />

            <content-body secondary>
                <div v-html="contactInformation" />
            </content-body>
        </content-container>
    </page-layout>
</template>

<script setup lang="ts">
import PageLayout from '@/dashboard/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import ContentHeader from '@/shared/components/layout/content/ContentHeader.vue';
import ContentBody from '@/shared/components/layout/content/ContentBody.vue';
import InfoItem from '@/shared/components/blocks/InfoItem.vue';
import CurrencyInfoItem from '@/shared/components/blocks/CurrencyInfoItem.vue';
import { storeToRefs } from 'pinia';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { useContentsStore, useStatisticsStore, useUserStore } from '@/dashboard/stores';
import { getPercentUserOutput } from '@/shared/components/utils/outputUtils';
import { USER_BALANCE_CURRENCY } from '@/dashboard/constants';

const { rate, currency } = storeToRefs(useUserStore());

const { loadTotalKpi } = useStatisticsStore();
const { totalKpi } = storeToRefs(useStatisticsStore());

const { loadContents } = useContentsStore();
const { platformInstruction, contactInformation } = storeToRefs(useContentsStore());

useViewHelper(async () => Promise.all([
    loadTotalKpi(),
    loadContents(),
]));
</script>

<style scoped>
.info-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
}

@media (max-width: 600px) {
    .info-container {
        grid-template-columns: 1fr;
    }
}
</style>
