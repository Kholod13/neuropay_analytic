<template>
    <page-layout>
        <content-container>
            <content-header title="Редактируемая аналитика" icon="pi pi-chart-bar">
                <template #actions>
                    <app-button label="Сохранить" severity="primary" :type="EButtonType.BUTTON" @click="saveData" />
                </template>
            </content-header>

            <h2>Pay-In</h2>
            <div class="items-block">
                <div class="item">
                    <h3>Всего сделок</h3>
                    <input v-model="analyticsData.payIn.totalDeals" type="number" />
                    <div class="deals-block">
                        <div class="row">
                            <p>Подтвержденных</p>
                            <input v-model="analyticsData.payIn.confirmedDeals" type="number" />
                        </div>
                        <div class="row">
                            <p>Отмененных</p>
                            <input v-model="analyticsData.payIn.canceledDeals" type="number" />
                        </div>
                    </div>
                </div>
                <div class="item">
                    <h3>Pay-In доход</h3>
                    <input v-model="analyticsData.payIn.revenue" type="number" />
                </div>
                <div class="item">
                    <h3>Сумма обработанного трафика</h3>
                    <input v-model="analyticsData.payIn.traffic" type="number" />
                </div>
            </div>

            <h2>Pay-Out</h2>
            <div class="items-block">
                <div class="item">
                    <h3>Всего сделок</h3>
                    <input v-model="analyticsData.payOut.totalDeals" type="number" />
                    <div class="deals-block">
                        <div class="row">
                            <p>Подтвержденных</p>
                            <input v-model="analyticsData.payOut.confirmedDeals" type="number" />
                        </div>
                        <div class="row">
                            <p>Отмененных</p>
                            <input v-model="analyticsData.payOut.canceledDeals" type="number" />
                        </div>
                    </div>
                </div>
                <div class="item">
                    <h3>Pay-Out доход</h3>
                    <input v-model="analyticsData.payOut.revenue" type="number" />
                </div>
                <div class="item">
                    <h3>Сумма обработанного трафика</h3>
                    <input v-model="analyticsData.payOut.traffic" type="number" />
                </div>
            </div>

            <div class="total-block">
                <p>ОБЩАЯ ПРИБЫЛЬ: <span class="value">{{ totalProfit }}</span></p>
            </div>
        </content-container>
    </page-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useAnalyticsStore } from '@/admin/stores/analyticsStore';
import PageLayout from '@/dashboard/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import ContentHeader from '@/shared/components/layout/content/ContentHeader.vue';
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import { EButtonType } from '@/shared/components/blocks/form/types';

const analyticsStore = useAnalyticsStore();
const analyticsData = analyticsStore.analyticsData;

const totalProfit = computed(() => analyticsData.payIn.revenue + analyticsData.payOut.revenue);

const saveData = () => {
    analyticsStore.updateAnalytics({ ...analyticsData });
    console.log('Данные сохранены:', analyticsData);
};
</script>
