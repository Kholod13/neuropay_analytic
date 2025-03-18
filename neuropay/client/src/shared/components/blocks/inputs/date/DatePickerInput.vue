<template>
    <form-input
        :id="id"
        :label="fieldLabel"
        :required="required"
        :invalid="isFieldInvalid"
        :error-text="fieldErrorText"
        :help-text-id="fieldHelpTextId">
        <float-label>
            <DatePicker
                v-model="modelValue"
                v-bind="$attrs"
                :date-format="dateFormat"
                :input-id="id"
                :fluid="fluid"
                :aria-describedby="fieldHelpTextId"
                :invalid="isFieldInvalid"
                :disabled="disabled" />

            <label :for="id">{{ fieldLabel }}</label>
        </float-label>
    </form-input>
</template>

<script setup lang="ts">
import DatePicker, { type DatePickerProps } from 'primevue/datepicker';
import FormInput from '@/shared/components/blocks/inputs/FormInput.vue';
import FloatLabel from '@/shared/components/blocks/inputs/FloatLabel.vue';
import { toRefs } from 'vue';
import { useFormField } from '@/shared/components/blocks/inputs/formFieldHelper';
import Textarea from 'primevue/textarea';

type Props = {
    id: string
    label: string
    required?: boolean
    disabled?: boolean
    invalid?: boolean
    errorText?: string | null

    fluid?: boolean
    dateFormat?: DatePickerProps['dateFormat']
}

const modelValue = defineModel<DatePickerProps['modelValue']>();
const props = withDefaults(defineProps<Props>(), {
    fluid: false,
    dateFormat: 'dd.mm.yy',
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
</script>
