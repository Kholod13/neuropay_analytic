import { computed, type Ref } from 'vue';
import { isValue } from '@/shared/utils/typeUtils';

export type UseFormFieldOptions = {
    id: Ref<string>
    label: Ref<string>
    required: Ref<boolean>
    disabled: Ref<boolean>
    invalid: Ref<boolean>
    errorText: Ref<string | null | undefined>
}

export type UseFormFieldReturn = {
    fieldLabel: Readonly<Ref<string>>
    isFieldInvalid: Readonly<Ref<boolean>>
    fieldErrorText: Readonly<Ref<string | null>>
    fieldHelpTextId: Readonly<Ref<string>>
}

export function useFormField ({ id, label, required, disabled, invalid, errorText }: UseFormFieldOptions): UseFormFieldReturn {
    const fieldLabel = computed(() => required.value ? `${label.value} *` : label.value);

    const fieldErrorText = computed(() =>
        disabled.value
            ? null
            : (errorText.value ?? null),
    );
    const isFieldInvalid = computed(() => invalid.value || isValue(fieldErrorText.value));

    const fieldHelpTextId = computed(() => `${id.value}_help`);

    return {
        fieldLabel,
        isFieldInvalid,
        fieldErrorText,
        fieldHelpTextId,
    };
}
