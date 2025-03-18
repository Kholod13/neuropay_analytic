<template>
    <div class="checkbox-container">
        <Checkbox
            v-model="modelValue"
            v-bind="$attrs"
            class="checkbox"
            :name="name"
            :value="value"
            :input-id="inputId"
            :invalid="invalid" />
        <label :for="inputId">{{ label }}</label>
    </div>
</template>

<script lang="ts" setup>
import Checkbox from 'primevue/checkbox';

export type CommonCheckboxProps = {
    name: string
    label: string
    inputId: string
    invalid?: boolean
}

type Props = CommonCheckboxProps & {
    value: string
}

const modelValue = defineModel<string[]>();
withDefaults(defineProps<Props>(), {
    invalid: false,
});

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.checkbox-container {
    display: flex;
    align-items: center;
    gap: 8px;
}

.checkbox {
    flex-shrink: 0;
}
</style>
