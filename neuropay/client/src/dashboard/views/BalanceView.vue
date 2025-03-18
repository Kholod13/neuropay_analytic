<template>
    <page-layout secondary>
        <content-container secondary>
            <content-header
                title="Баланс"
                secondary />

            <content-body secondary>
                <currency-info-item
                    label="Страховой депозит"
                    :value="securityDeposit"
                    :currency="USER_BALANCE_CURRENCY" />
                <currency-info-item
                    label="Рабочий депозит"
                    :value="workingDeposit"
                    :currency="USER_BALANCE_CURRENCY" />
                <currency-info-item
                    label="Замороженный депозит"
                    :value="frozenDeposit"
                    :currency="USER_BALANCE_CURRENCY" />
            </content-body>
        </content-container>

        <content-container secondary>
            <content-header
                title="Кошелек для пополнения"
                secondary />

            <content-body secondary>
                <info-item
                    label="USDT(TRC20)"
                    :value="user?.walletAddress ?? ''"
                    value-class="break-all" />
            </content-body>
        </content-container>
    </page-layout>
</template>

<script lang="ts" setup>
import PageLayout from '@/dashboard/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import ContentBody from '@/shared/components/layout/content/ContentBody.vue';
import InfoItem from '@/shared/components/blocks/InfoItem.vue';
import CurrencyInfoItem from '@/shared/components/blocks/CurrencyInfoItem.vue';
import ContentHeader from '@/shared/components/layout/content/ContentHeader.vue';
import { storeToRefs } from 'pinia';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { useUserStore } from '@/dashboard/stores';
import { USER_BALANCE_CURRENCY } from '@/dashboard/constants';

const { user, securityDeposit, workingDeposit, frozenDeposit } = storeToRefs(useUserStore());

useViewHelper();
</script>
