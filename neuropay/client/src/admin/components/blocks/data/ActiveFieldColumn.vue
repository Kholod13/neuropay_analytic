<template>
    <i
        class="pi"
        :class="{
            'pi-check-circle': active,
            'pi-times-circle': !active
        }"/>
</template>

<script setup lang="ts">
defineProps<{
    active: boolean
}>();
</script>

<style scoped>
.pi-check-circle {
    color: var(--p-green-500);
}

.pi-times-circle {
    color: var(--p-red-400);
}
</style>
