<template>
    <app-checkbox
        v-model="checkboxModelValue"
        :name="name"
        :label="label"
        :input-id="inputId"
        :invalid="invalid"
        :value="TRUE_VALUE" />
</template>

<script lang="ts" setup>
import AppCheckbox, { type CommonCheckboxProps } from './AppCheckbox.vue';
import { computed } from 'vue';

const TRUE_VALUE = '1';

const modelValue = defineModel<boolean>();
defineProps<CommonCheckboxProps>();

const checkboxModelValue = computed({
    get: () => modelValue.value ? [TRUE_VALUE] : [],
    set (value) {
        modelValue.value = value.length > 0;
    },
});
</script>
