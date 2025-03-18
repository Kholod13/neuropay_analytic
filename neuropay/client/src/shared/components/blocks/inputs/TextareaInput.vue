<template>
    <form-input
        :id="id"
        :label="fieldLabel"
        :required="required"
        :invalid="isFieldInvalid"
        :error-text="fieldErrorText"
        :help-text-id="fieldHelpTextId">
        <float-label :class="containerClass">
            <Textarea
                v-model="modelValue"
                class="textarea"
                :id="id"
                rows="3"
                :aria-describedby="fieldHelpTextId"
                :invalid="isFieldInvalid"
                :disabled="disabled"
                :fluid="fluid"
                v-bind="$attrs" />
            <label :for="id">{{ label }}</label>
        </float-label>
    </form-input>
</template>

<script lang="ts" setup>
import Textarea from 'primevue/textarea';
import FloatLabel from './FloatLabel.vue';
import FormInput from '@/shared/components/blocks/inputs/FormInput.vue';
import { toRefs } from 'vue';
import { useFormField } from '@/shared/components/blocks/inputs/formFieldHelper';

type Props = {
    id: string
    label: string
    containerClass?: string
    fluid?: boolean

    required?: boolean
    invalid?: boolean
    disabled?: boolean
    errorText?: string
}

const modelValue = defineModel<string>();
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
</script>

<style scoped>
.textarea {
    resize: none;
}
</style>
