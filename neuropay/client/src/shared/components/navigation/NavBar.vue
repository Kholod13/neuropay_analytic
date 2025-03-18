<template>
    <nav class="nav">
        <nav-item
            v-for="(item, index) in items"
            :key="index"
            :route="item.route"
            :icon="item.icon"
            :label="item.label" />
    </nav>
</template>

<script setup lang="ts">
import NavItem from './NavItem.vue';
import type { NavigationItem } from './types';

defineProps<{
    items: NavigationItem[]
}>();
</script>

<style scoped>
.nav {
    display: flex;
    flex-direction: column;
}
</style>
