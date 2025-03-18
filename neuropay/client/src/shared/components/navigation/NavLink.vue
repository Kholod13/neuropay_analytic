<template>
    <router-link
        class="nav-link"
        :class="{ fluid }"
        :to="route">
        <slot />
    </router-link>
</template>

<script setup lang="ts">
import type { Route } from '@/router/types';

type Props = {
    route: Route
    fluid?: boolean
}

withDefaults(defineProps<Props>(), {
    fluid: false,
});
</script>

<style scoped>
.nav-link.fluid {
    width: 100%;
}
</style>
