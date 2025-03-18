<template>
    <app-form
        @submit="$emit('submit')"
        class="form-layout">
        <slot />
    </app-form>
</template>

<script lang="ts" setup>
import AppForm from '@/shared/components/blocks/form/AppForm.vue';

type Emits = {
    (event: 'submit'): void
}

defineEmits<Emits>();
</script>

<style scoped>
.form-layout {
    width: 100%;
    gap: 1rem;
}
</style>
