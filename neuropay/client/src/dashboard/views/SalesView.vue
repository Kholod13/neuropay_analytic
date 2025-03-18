<template>
    <page-layout>
        <content-container>
            <Message severity="error">
                <div v-html="payInOrdersAreUnavailableErrorMessage" />
            </Message>

            <content-header
                title="Ордера"
                icon="pi pi-shopping-cart">
                <template #actions>
                    <toggle-switch
                        v-model="isActive"
                        input-id="sales-filters_is-active"
                        label="Активен" />
                </template>
            </content-header>

            <sales-tabs-bar v-model="activeTabId" />

            <content-body secondary>
                <div v-if="activeTabId === ESalesTabId.ACTIVE">У вас нет активных ордеров.</div>
                <div v-else>У вас нет обработанных ордеров.</div>
            </content-body>
        </content-container>
    </page-layout>
</template>

<script lang="ts" setup>
import Message from 'primevue/message';
import PageLayout from '@/dashboard/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import ContentHeader from '@/shared/components/layout/content/ContentHeader.vue';
import ContentBody from '@/shared/components/layout/content/ContentBody.vue';
import ToggleSwitch from '@/shared/components/blocks/inputs/checkbox/ToggleSwitch.vue';
import SalesTabsBar from '@/dashboard/components/sales/SalesTabsBar.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { ESalesTabId } from '@/dashboard/components/sales/types';
import { useContentsStore } from '@/dashboard/stores';

const { loadContents } = useContentsStore();
const { payInOrdersAreUnavailableErrorMessage } = storeToRefs(useContentsStore());

const isActive = ref(false);

const activeTabId = ref(ESalesTabId.ACTIVE);

useViewHelper(loadContents);
</script>
