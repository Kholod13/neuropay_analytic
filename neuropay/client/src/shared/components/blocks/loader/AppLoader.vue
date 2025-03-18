<template>
    <div class="loader">
        <ProgressSpinner />
    </div>
</template>

<script lang="ts" setup>
import ProgressSpinner from 'primevue/progressspinner';
</script>

<style scoped>
.loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--p-primary-contrast-color);
}
</style>
