<template>
    <content-bar
        class="content-header"
        :secondary="secondary">
        <div class="content-header-title">
            <i
                v-if="icon"
                :class="icon"
                class="content-header-title" />
            <div>{{ title }}</div>
        </div>

        <div class="content-header-actions">
            <slot name="actions" />
        </div>
    </content-bar>
</template>

<script lang="ts" setup>
import ContentBar from './ContentBar.vue';

export type ContentHeaderProps = {
    title: string
    icon?: string
    secondary?: boolean
}

withDefaults(defineProps<ContentHeaderProps>(), {
    secondary: false,
});
</script>

<style scoped>
.content-header {
    padding: 1rem 2rem;
}

.content-header.secondary {
    padding: 0;
}

.content-header-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--p-text-color);
}

.content-header-title {
    font-size: 1.7rem;
}

.content-header-actions {
    margin-left: auto;
    display: flex;
    gap: 1rem;
}

@media (width <= 768px) {
    .content-header {
        padding: 1rem;
    }

    .content-header.secondary {
        padding: .5rem 0;
    }

    .content-header-title {
        font-size: 1.5rem;
    }
}
</style>
