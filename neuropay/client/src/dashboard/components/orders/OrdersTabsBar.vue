<template>
    <content-bar>
        <Tabs v-model:value="modelValue">
            <TabList>
                <Tab :value="EOrdersTabId.ALL">Все</Tab>
                <Tab :value="EOrdersTabId.ACCEPTED">Принятые</Tab>
                <Tab :value="EOrdersTabId.PENDING">На проверке</Tab>
                <Tab :value="EOrdersTabId.COMPLETED">Завершенные</Tab>
            </TabList>
        </Tabs>
    </content-bar>
</template>

<script lang="ts" setup>
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import ContentBar from '@/shared/components/layout/content/ContentBar.vue';
import { EOrdersTabId } from './types';

const modelValue = defineModel<EOrdersTabId>({ required: true });
</script>
