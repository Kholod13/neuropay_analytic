<template>
    <content-bar>
        <Tabs v-model:value="modelValue">
            <TabList>
                <Tab :value="EBankCardTabId.ACTIVE">Активные</Tab>
                <Tab :value="EBankCardTabId.HIDDEN">Скрытые</Tab>
            </TabList>
        </Tabs>
    </content-bar>
</template>

<script lang="ts" setup>
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import ContentBar from '@/shared/components/layout/content/ContentBar.vue';
import { EBankCardTabId } from '@/dashboard/components/bank-card/tabs/types';

const modelValue = defineModel<EBankCardTabId>({ required: true });
</script>
