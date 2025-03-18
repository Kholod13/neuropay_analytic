<template>
    <div
        class="content-bar"
        :class="{ styled, secondary }">
        <slot />
    </div>
</template>

<script lang="ts" setup>
type Props = {
    styled?: boolean
    secondary?: boolean
}

withDefaults(defineProps<Props>(), {
    styled: false,
    secondary: false,
});
</script>

<style scoped>
.content-bar {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-radius: var(--p-content-border-radius);
    background-color: var(--p-content-background);
    box-shadow: rgb(0 0 0 / 0.12) 0 12px 40px 0;
}

.content-bar.styled {
    padding: 1rem 2rem;
}

.content-bar.secondary {
    background-color: transparent;
    box-shadow: none;
}
</style>
