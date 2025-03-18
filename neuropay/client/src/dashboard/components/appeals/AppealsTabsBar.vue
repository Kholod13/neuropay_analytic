<template>
    <content-bar>
        <Tabs v-model:value="modelValue">
            <TabList>
                <Tab :value="EAppealsTabId.ACTIVE">Активные</Tab>
                <Tab :value="EAppealsTabId.ARCHIVE">Архив</Tab>
            </TabList>
        </Tabs>
    </content-bar>
</template>

<script lang="ts" setup>
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import ContentBar from '@/shared/components/layout/content/ContentBar.vue';
import { EAppealsTabId } from './types';

const modelValue = defineModel<EAppealsTabId>({ required: true });
</script>
