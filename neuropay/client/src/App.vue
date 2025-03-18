<template>
    <Toast
        :group="EMessageGroup.PRIMARY"
        :position="toastPosition" />
    <Toast
        :group="EMessageGroup.SECONDARY"
        :position="toastPosition" />

    <confirm-popup />

    <router-view />

    <BlockUI
        :blocked="applicationStore.isLoading"
        :pt="{ mask: { class: 'page-block-mask' } }"
        full-screen />
    <div
        v-show="applicationStore.isLoading"
        class="page-loader-wrapper">
        <page-loader />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Toast from 'primevue/toast';
import BlockUI from 'primevue/blockui';
import PageLoader from '@/shared/components/blocks/loader/AppLoader.vue';
import ConfirmPopup from '@/shared/components/blocks/popup/ConfirmPopup.vue';
import { computed, onMounted } from 'vue';
import { useWindowSize } from '@vueuse/core';
import { EMessageGroup } from '@/shared/components/blocks/toast/types';
import { useApplicationStore } from '@/shared/stores';

const applicationStore = useApplicationStore();

const { width } = useWindowSize();
const toastPosition = computed(() => width.value > 600 ? 'top-right' : 'top-center');

onMounted(() => {
    applicationStore.setIsLoading(false);
});
</script>

<style scoped>
:global(.page-block-mask) {
    background: transparent !important;
}

.page-loader-wrapper {
    position: fixed;
    inset: 0;
    z-index: 99999;
}
</style>
