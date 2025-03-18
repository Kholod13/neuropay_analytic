<template>
    <small
        class="help-text"
        :class="{ error }">
        <slot />
    </small>
</template>

<script lang="ts" setup>
type Props = {
    error?: boolean
}

withDefaults(defineProps<Props>(), {
    error: false,
});
</script>

<style scoped>
.help-text {
    margin-left: 1rem;

    &.error {
        color: var(--p-form-field-invalid-placeholder-color);
    }
}
</style>
