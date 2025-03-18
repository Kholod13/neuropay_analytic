<template>
    <form-input
        :id="id"
        :label="fieldLabel"
        :required="required"
        :invalid="isFieldInvalid"
        :error-text="fieldErrorText"
        :help-text-id="fieldHelpTextId">
        <float-label :class="containerClass">
            <input-number
                v-model="modelValue"
                :id="id"
                :aria-describedby="fieldHelpTextId"
                :invalid="isFieldInvalid"
                :disabled="disabled"
                :fluid="fluid"
                :min="min"
                :max="max"
                :min-fraction-digits="0"
                :max-fraction-digits="maxFractionDigits"
                v-bind="$attrs" />
            <label :for="id">{{ label }}</label>
        </float-label>
    </form-input>
</template>

<script setup lang="ts">
import InputNumber from 'primevue/inputnumber';
import FloatLabel from '@/shared/components/blocks/inputs/FloatLabel.vue';
import FormInput from '@/shared/components/blocks/inputs/FormInput.vue';
import { computed, toRefs } from 'vue';
import { useFormField } from '@/shared/components/blocks/inputs/formFieldHelper';

type Props = {
    id: string
    label: string
    containerClass?: string
    fluid?: boolean

    min?: number
    max?: number
    float?: boolean

    required?: boolean
    invalid?: boolean
    disabled?: boolean
    errorText?: string
}

const modelValue = defineModel<number>();
const props = withDefaults(defineProps<Props>(), {
    containerClass: '',
    fluid: true,
    required: false,
    invalid: false,
    disabled: false,
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

const maxFractionDigits = computed(() => props.float ? 2 : 0);
</script>
