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
            <h2>Pay-In</h2>
            <div class="items-block">
                <div class="item">
                    <h3>Всего сделок</h3>
                    <p>0</p>
                    <div class="deals-block">
                        <div class="row">
                            <p>Подтвержденных</p>
                            <p class="value">0</p>
                        </div>
                        <div class="row">
                            <p>Отмененных</p>
                            <p class="value">0</p>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <h3>Pay-In доход</h3>
                    <p class="value">000</p>
                </div>
                <div class="item">
                    <h3>Сумма обработанного трафика</h3>
                    <div class="value-block">
                        <p class="value">000</p>
                    </div>
                </div>
            </div>
            <h2>Pay-Out</h2>
            <div class="items-block">
                <div class="item">
                    <h3>Всего сделок</h3>
                    <p>12 344 344</p>
                    <div class="deals-block">
                        <div class="row">
                            <p>Подтвержденных</p>
                            <p class="value">23444</p>
                        </div>
                        <div class="row">
                            <p>Отмененных</p>
                            <p class="value">342</p>
                        </div>
                    </div>
                </div>
                <div class="item">
                    <h3>Pay-Out доход</h3>
                    <p class="value">12342342324</p>
                </div>
                <div class="item">
                    <h3>Сумма обработанного трафика</h3>
                    <div class="value-block">
                        <p class="value">23423424</p>
                    </div>
                </div>
            </div>
            <div class="total-block">
                <p>ОБЩАЯ ПРИБЫЛЬ: <span class="value">000</span></p>
            </div>
        </content-container>
    </page-layout>
</template>

<style lang="css" >
h2{
    color: #B890F1;
    font-size: 50px;
    margin: 0;
}
h3{
    font-size: 28px;
    word-spacing: 0.1em;
    margin: 20px 0;
}
.items-block{
    display: flex;
    justify-content: space-between;
    padding: 20px 10px 0 10px;
    border-top: 5px solid white;
    gap: 10px;
}
.items-block .item{
    background: #2B3B4A;
    border-radius: 5px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.item p{
    margin: 0 20px;
    font-size: 30px;
}
.deals-block{
    display: flex;
    flex-direction: column;
    padding: 20px 0;
}
.deals-block .row p{
    font-size: 18px;
    margin: 0;
    margin-left: 5px;
}
.deals-block .row{
    display: flex;
    justify-content: space-between;
    margin-left: 20px;
    gap: 50px;
}
.deals-block .row:first-child{
    border-left: #398227 solid 5px;
}
.deals-block .row:last-child{
    border-left: #43404B solid 5px;
    margin-top: 5px;
}
.row .value{
    margin: 0px;
}
.items-block .item:nth-child(2), .items-block .item:nth-child(3){
    text-align: center;
    padding: 20px 50px;
    justify-content: center;
}
.items-block .item:nth-child(2) p, .items-block .item:nth-child(3) p{
    font-size: 40px;
    font-weight: bold;
    color: #AE8EEA;
}
.items-block .item:nth-child(3) .value-block{
    padding-top: 10px;
    border-top: white solid 3px;
}
.total-block p{
    font-size: 32px;
    font-weight: bold;
}
.total-block span{
    color: #AE8EEA;
}
</style>

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
