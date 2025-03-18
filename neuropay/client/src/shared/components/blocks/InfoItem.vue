<template>
    <div class="info-item">
        <div class="item-label">{{ label }}</div>
        <div
            class="item-value"
            :class="valueClass">{{ value }}</div>
    </div>
</template>

<script lang="ts" setup>
type Props = {
    label: string
    value: string | number
    valueClass?: string
}

defineProps<Props>();
</script>

<style scoped>
.info-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.item-label {
    display: flex;
    align-items: center;
    font-size: 1rem;
    font-weight: 800;
    color: #bebdbd;
}

.item-value {
    display: flex;
    align-items: center;
    font-size: 2rem;
    font-weight: bold;
    color: var(--p-text-color);
}

@media (width <= 768px) {
    .info-item {
        gap: 0.25rem;
    }

    .item-value {
        font-size: 1.5rem;
    }
}
</style>
