<template>
    <div
        class="content-body"
        :class="{ secondary }">
        <slot />
    </div>
</template>

<script lang="ts" setup>
type Props = {
    secondary?: boolean
}

withDefaults(defineProps<Props>(), {
    secondary: false,
});
</script>

<style scoped>
.content-body {
    height: 100%;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--p-content-background);
    border-radius: var(--p-content-border-radius);
    box-shadow: rgb(0 0 0 / 0.12) 0 12px 40px 0;
}

.content-body.secondary {
    height: auto;
    padding: 2rem;
}

@media (width <= 768px) {
    .content-body {
        padding: .5rem;
    }

    .content-body.secondary {
        padding: 1rem;
    }
}
</style>
