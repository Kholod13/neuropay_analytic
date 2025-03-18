<template>
    <div class="page-sidebar">
        <nav-bar :items="navItems" />
    </div>
</template>

<script lang="ts" setup>
import NavBar from '@/shared/components/navigation/NavBar.vue';
import type { NavigationItem } from '@/shared/components/navigation/types';

type Props = {
    navItems: NavigationItem[]
}
defineProps<Props>();
</script>

<style scoped>
.page-sidebar {
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem 0;
    background-color: var(--p-content-secondary-background);
    backdrop-filter: blur(8px);
    border-top-right-radius: var(--p-content-border-radius);
    border-bottom-right-radius: var(--p-content-border-radius);
    border-right: 1px solid var(--p-content-secondary-border-color);
}
</style>
