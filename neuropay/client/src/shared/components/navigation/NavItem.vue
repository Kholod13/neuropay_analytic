<template>
    <nav-link
        class="nav-item"
        :class="{ active: isActive }"
        :route="route">
        <i
            :class="icon"
            class="nav-item-icon" />
        <div>{{ label }}</div>

        <div class="left-border" />
    </nav-link>
</template>

<script lang="ts" setup>
import NavLink from '@/shared/components/navigation/NavLink.vue';
import { useLink } from 'vue-router';
import { toRefs } from 'vue';
import type { Route } from '@/router/types';

type Props = {
    route: Route
    icon: string
    label: string
}

const props = defineProps<Props>();
const { route } = toRefs(props);

const { isActive } = useLink({
    to: route,
});
</script>

<style scoped>
.nav-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: .8rem;
    font-size: 1.2rem;
    padding: .8rem 2rem;
}

.nav-item.active {
    color: var(--p-primary-color);
}

.nav-item.active .left-border {
    display: block;
}

.nav-item-icon {
    font-size: 1.3rem;
}

.left-border {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: var(--p-primary-color);
}
</style>
