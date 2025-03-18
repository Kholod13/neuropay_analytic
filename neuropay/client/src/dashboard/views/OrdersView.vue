<template>
    <page-layout>
        <content-container full-height>
            <content-header
                title="Ордера"
                icon="pi pi-money-bill" />

            <div class="orders-view-content-container">
                <div class="block-mask">
                    <Message severity="error">
                        <div v-html="payOutOrdersAreUnavailableErrorMessage" />
                    </Message>
                </div>

                <orders-tabs-bar
                    class="orders-view-tabs-bar"
                    v-model="activeTabId" />

                <content-body class="orders-view-content-body">
                    <orders-table :orders="orders" />
                </content-body>
            </div>
        </content-container>
    </page-layout>
</template>

<script lang="ts" setup>
import Message from 'primevue/message';
import PageLayout from '@/dashboard/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import ContentHeader from '@/shared/components/layout/content/ContentHeader.vue';
import ContentBody from '@/shared/components/layout/content/ContentBody.vue';
import OrdersTabsBar from '@/dashboard/components/orders/OrdersTabsBar.vue';
import OrdersTable from '@/dashboard/components/orders/OrdersTable.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { EOrdersTabId } from '@/dashboard/components/orders/types';
import { wait } from '@/shared/utils/utils';
import { useContentsStore } from '@/dashboard/stores';

const { loadContents } = useContentsStore();
const { payOutOrdersAreUnavailableErrorMessage } = storeToRefs(useContentsStore());

const activeTabId = ref(EOrdersTabId.ALL);

const orders = ref<Record<string, unknown>[]>([]);

const ordersCount = 200;

useViewHelper(async () => Promise.all([
    loadContents(),
    loadOrders(),
]));

async function loadOrders (): Promise<void> {
    for (let i = 0; i < ordersCount; i++) {
        await wait(0);
        orders.value.push({});
    }
}
</script>

<style scoped>
.orders-view-content-container {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.orders-view-tabs-bar {
    overflow: hidden;
}

.orders-view-content-body {
    overflow: hidden;
}

.block-mask {
    z-index: 1;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: absolute;
    inset: 0;
    padding: 10% 2rem;
    border-radius: var(--p-content-border-radius);
    background-color: var(--p-content-secondary-background);
    backdrop-filter: blur(8px);
}
</style>
