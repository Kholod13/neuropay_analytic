<template>
    <div
        class="content-container"
        :class="{ secondary, 'full-height': fullHeight }">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { PAGE_HEADER_HEIGHT_PX } from '@/shared/components/layout/constants';
import { px } from '@/shared/utils/styleUtils';

type Props = {
    secondary?: boolean
    fullHeight?: boolean
}

withDefaults(defineProps<Props>(), {
    secondary: false,
    fullHeight: false,
});

const pageHeaderHeight = px(PAGE_HEADER_HEIGHT_PX);
</script>

<style scoped>
.content-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
}

.content-container.secondary {
    height: auto;
    padding: 2rem;
    gap: 1.5rem;
}

.content-container.full-height {
    height: calc(100vh - v-bind(pageHeaderHeight));
}

@media (width <= 768px) {
    .content-container {
        padding: 1rem .5rem;
    }

    .content-container.secondary {
        padding: 1rem;
        gap: .5rem;
    }
}
</style>
