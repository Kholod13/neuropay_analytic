<template>
    <content-bar>
        <Tabs v-model:value="modelValue">
            <TabList>
                <Tab :value="ESalesTabId.ACTIVE">Активные</Tab>
                <Tab :value="ESalesTabId.ARCHIVE">Архив</Tab>
            </TabList>
        </Tabs>
    </content-bar>
</template>

<script lang="ts" setup>
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import ContentBar from '@/shared/components/layout/content/ContentBar.vue';
import { ESalesTabId } from './types';

const modelValue = defineModel<ESalesTabId>({ required: true });
</script>
