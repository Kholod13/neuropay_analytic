<template>
    <Drawer v-model:visible="visible">
        <template #container>
            <div class="container">
                <div class="header">
                    <div :style="{ height: logoHeight }">
                        <header-logo />
                    </div>

                    <app-button
                        @click="close"
                        icon="pi pi-times"
                        severity="secondary"
                        :type="EButtonType.BUTTON"
                        text />
                </div>

                <nav-bar :items="navItems" />
            </div>
        </template>
    </Drawer>
</template>

<script setup lang="ts">
import Drawer from 'primevue/drawer';
import NavBar from '@/shared/components/navigation/NavBar.vue';
import HeaderLogo from '@/shared/components/layout/header/HeaderLogo.vue';
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import { PAGE_HEADER_CONTENT_HEIGHT_PX } from '@/shared/components/layout/constants';
import { px } from '@/shared/utils/styleUtils';
import { EButtonType } from '@/shared/components/blocks/form/types';
import type { NavigationItem } from '@/shared/components/navigation/types';

type Props = {
    navItems: NavigationItem[]
}

const visible = defineModel<boolean>('visible', { required: true });

defineProps<Props>();

const logoHeight = px(PAGE_HEADER_CONTENT_HEIGHT_PX);

function close (): void {
    visible.value = false;
}
</script>

<style scoped>
.container {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--p-content-secondary-border-color);
}
</style>
