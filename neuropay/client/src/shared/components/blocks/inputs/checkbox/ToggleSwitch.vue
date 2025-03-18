<template>
    <div class="toggle-switch-container">
        <ToggleSwitch
            v-model="modelValue"
            v-bind="$attrs"
            class="toggle-switch"
            :input-id="inputId" />
        <label :for="inputId">{{ label }}</label>
    </div>
</template>

<script lang="ts" setup>
import ToggleSwitch from 'primevue/toggleswitch';

type Props = {
    label: string
    inputId: string
}

const modelValue = defineModel<boolean>();
defineProps<Props>();

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.toggle-switch-container {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
}

.toggle-switch {
    flex-shrink: 0;
}
</style>
