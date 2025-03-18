<template>
    <div
        class="content"
        :class="{ secondary }">
        <desktop-header
            @logout="$emit('logout')"
            class="layout-header desktop-layout-header"
            :user-login="userLogin" />
        <mobile-header
            @logout="$emit('logout')"
            @toggle-menu="showMobileSidebar"
            class="layout-header mobile-layout-header"
            :user-login="userLogin" />

        <div class="main-content-wrapper">
            <desktop-sidebar
                class="layout-sidebar"
                :nav-items="navItems" />
            <mobile-sidebar
                v-model:visible="mobileSidebarVisible"
                :nav-items="navItems" />

            <main class="main">
                <slot />
            </main>
        </div>
    </div>
</template>

<script setup lang="ts">
import DesktopHeader from './header/DesktopHeader.vue';
import MobileHeader from './header/MobileHeader.vue';
import DesktopSidebar from './sidebar/DesktopSidebar.vue';
import MobileSidebar from './sidebar/MobileSidebar.vue';
import { ref } from 'vue';
import { PAGE_HEADER_HEIGHT_PX } from './constants';
import { px } from '@/shared/utils/styleUtils';
import type { NavigationItem } from '@/shared/components/navigation/types';

type Props = {
    navItems: NavigationItem[]
    userLogin?: string
    secondary?: boolean
}
type Emits = {
    (event: 'logout'): void
}

withDefaults(defineProps<Props>(), {
    secondary: false,
});
defineEmits<Emits>();

const pageHeaderHeight = px(PAGE_HEADER_HEIGHT_PX);

const mobileSidebarVisible = ref(false);

function showMobileSidebar (): void {
    mobileSidebarVisible.value = true;
}
</script>

<style scoped>
.content {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--p-primary-contrast-color);
}

.layout-header {
    top: 0;
}

.layout-sidebar {
    height: calc(100vh - v-bind(pageHeaderHeight));
    top: v-bind(pageHeaderHeight);
}

.layout-header, .layout-sidebar {
    position: sticky;
    z-index: 2;
}

.desktop-layout-header {
    display: block;
}

.mobile-layout-header {
    display: none;
}

.main-content-wrapper {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.main {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.content.secondary .main {
    padding: 1.5rem;
}

@media (width <= 1000px) {
    .layout-sidebar {
        display: none;
    }

    .desktop-layout-header {
        display: none;
    }

    .mobile-layout-header {
        display: block;
    }
}

@media (width <= 768px) {
    .content.secondary .main {
        padding: 0;
        gap: .5rem;
    }
}
</style>
