<template>
    <form-input
        :id="id"
        :label="fieldLabel"
        :required="required"
        :invalid="isFieldInvalid"
        :error-text="fieldErrorText"
        :help-text-id="fieldHelpTextId">
        <float-label>
            <Select
                v-model="modelValue"
                v-bind="$attrs"
                :label-id="id"
                :options="options"
                :option-value="optionValue"
                :option-label="optionLabel"
                :option-disabled="optionDisabled"
                :loading="loading"
                :filter="filter"
                :disabled="disabled"
                :fluid="fluid"
                :empty-filter-message="emptyFilterMessage"
                :empty-message="emptyMessage"
                :required="required"
                :invalid="isFieldInvalid">
                <template #value="slotProps">
                    <span>{{ getOptionLabel(slotProps.value) }}&nbsp;</span>
                </template>
            </Select>

            <label :for="id">{{ fieldLabel }}</label>
        </float-label>
    </form-input>
</template>

<script lang="ts" setup>
import Select from 'primevue/select';
import FormInput from '../FormInput.vue';
import FloatLabel from '../FloatLabel.vue';
import { toRefs } from 'vue';
import { useFormField } from '@/shared/components/blocks/inputs/formFieldHelper';

type Props = {
    loading?: boolean
    filter?: boolean
    disabled?: boolean
    fluid?: boolean
    options: Record<string, unknown>[]
    optionValue: string
    optionLabel?: string
    optionDisabled?: string
    emptyFilterMessage?: string
    emptyMessage?: string

    id: string
    label: string

    required?: boolean
    invalid?: boolean
    errorText?: string | null
}

const modelValue = defineModel();
const props = withDefaults(defineProps<Props>(), {
    fluid: true,

    emptyFilterMessage: 'Ничего не найдено',
    emptyMessage: 'Нет доступных вариантов',
});

defineOptions({
    inheritAttrs: false,
});

const { id, label, required, disabled, invalid, errorText } = toRefs(props);

const { fieldLabel, isFieldInvalid, fieldErrorText, fieldHelpTextId } = useFormField({
    id,
    label,
    required,
    disabled,
    invalid,
    errorText,
});

function getOptionLabel (optionValue: unknown): string {
    const option = props.options.find(option => option[props.optionValue] === optionValue);
    if (!option) {
        return '';
    }

    return props.optionLabel
        ? option[props.optionLabel] as string
        : '';
}
</script>
