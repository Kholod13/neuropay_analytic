<template>
    <div class="form-row">
        <slot />
    </div>
</template>

<style scoped>
.form-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 1rem;
}

:global(.form-row > *) {
    width: 100%;
}
</style>
deep
