<template>
    <form-input
        :id="id"
        :label="fieldLabel"
        :required="required"
        :invalid="isFieldInvalid"
        :error-text="fieldErrorText"
        :help-text-id="fieldHelpTextId">
        <float-label class="float-label">
            <InputText
                v-if="type === ETextInputType.TEXT || type === ETextInputType.EMAIL || type === ETextInputType.TEL"
                v-model="modelValue"
                v-bind="$attrs"
                :id="id"
                :type="type"
                :aria-describedby="fieldHelpTextId"
                :invalid="isFieldInvalid"
                :disabled="disabled"
                :fluid="fluid" />
            <Password
                v-else-if="type === ETextInputType.PASSWORD"
                v-model="modelValue"
                :input-id="id"
                :input-props="$attrs"
                :aria-describedby="fieldHelpTextId"
                :invalid="isFieldInvalid"
                :disabled="disabled"
                :fluid="fluid"
                :feedback="false"
                toggle-mask />
            <InputMask
                v-else-if="Object.keys(inputMaskByType).includes(type)"
                v-model="modelValue"
                v-bind="$attrs"
                :id="id"
                :invalid="invalid"
                :fluid="fluid"
                :mask="inputMaskByType[type]" />

            <label :for="id">{{ fieldLabel }}</label>
        </float-label>
    </form-input>
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import InputMask from 'primevue/inputmask';
import FloatLabel from '../FloatLabel.vue';
import { toRefs } from 'vue';
import { ETextInputType } from './types';
import { inputMaskByType } from './constants';
import FormInput from '@/shared/components/blocks/inputs/FormInput.vue';
import { useFormField } from '@/shared/components/blocks/inputs/formFieldHelper';

type Props = {
    id: string
    label: string
    type?: ETextInputType
    containerClass?: string
    required?: boolean
    invalid?: boolean
    disabled?: boolean
    errorText?: string
    fluid?: boolean
}

const modelValue = defineModel<string>({ required: true });

const props = withDefaults(defineProps<Props>(), {
    type: ETextInputType.TEXT,
    containerClass: '',
    required: false,
    invalid: false,
    disabled: false,
    fluid: true,
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
.float-label label {
    z-index: 200;
}
</style>
