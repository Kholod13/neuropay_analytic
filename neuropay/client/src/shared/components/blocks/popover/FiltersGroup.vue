<template>
    <div class="filters-group">
        <div v-if="$slots.title">
            <slot name="title" />
        </div>

        <slot />
    </div>
</template>

<style scoped>
.filters-group {
    display: flex;
    flex-direction: column;
    gap: .8rem;
}
</style>
