<template>
    <data-record-dialog
        @hide="resetForm"
        @submit="submit"
        v-model:visible="visible"
        :header="header">
        <readonly-token-input
            v-show="activeTokenId && !tokenEditable"
            :token="activeToken" />
        <tokens-select-input
            v-show="tokenEditable"
            v-model="activeTokenId"
            :id="EFormFieldId.TOKEN_ID"
            :tokens="tokens"
            required />

        <select-input
            v-model="contentKey"
            v-bind="contentKeyAttrs"
            :id="EFormFieldId.CONTENT_KEY"
            label="Ключ"
            :options="contentKeyOptions"
            option-label="label"
            option-value="value"
            :invalid="isFieldInvalid(EFormFieldId.CONTENT_KEY)"
            required />
        <textarea-input
            v-model="contentValue"
            v-bind="contentValueAttrs"
            :id="EFormFieldId.CONTENT_VALUE"
            label="Контент"
            :invalid="isFieldInvalid(EFormFieldId.CONTENT_VALUE)"
            required />
    </data-record-dialog>
</template>

<script lang="ts" setup>
import DataRecordDialog from '@/admin/components/blocks/dialog/DataRecordDialog.vue';
import TextareaInput from '@/shared/components/blocks/inputs/TextareaInput.vue';
import SelectInput from '@/shared/components/blocks/inputs/select/SelectInput.vue';
import TokensSelectInput from '@/admin/components/blocks/inputs/token/TokensSelectInput.vue';
import ReadonlyTokenInput from '@/admin/components/blocks/inputs/token/ReadonlyTokenInput.vue';
import { computed, watch } from 'vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { storeToRefs } from 'pinia';
import { useFormErrors } from '@/shared/components/blocks/form/composables/formErrors';
import type { DynamicContentData } from '@/admin/stores/dashboard/contents/types';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import { useDashboardContentsStore, useDashboardTokensStore } from '@/admin/stores';

enum EFormFieldId {
    TOKEN_ID = 'contents-record-form_token-id',
    CONTENT_KEY = 'contents-record-form_content-key',
    CONTENT_VALUE = 'contents-record-form_content-value',
}

type Props = {
    header: string
    tokenEditable: boolean
    contentKeyEditable: boolean
    data?: DynamicContentData | null
}
type Emits = {
    (event: 'submit', data: DynamicContentData): void
}

const visible = defineModel<boolean>('visible', { required: true });
const activeTokenId = defineModel<DashboardToken['id'] | null>('activeTokenId', { required: true });

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { tokens, tokensById } = storeToRefs(useDashboardTokensStore());
const { contentKeys } = storeToRefs(useDashboardContentsStore());

const activeToken = computed(() => activeTokenId.value ? tokensById.value[activeTokenId.value] : null);
const contentKeyOptions = computed(() =>
    contentKeys.value.map(data => ({
        label: data.description,
        value: data.key,
    })),
);

const {
    controlledValues,
    errors: validationErrors,
    handleSubmit,
    defineField,
    resetForm,
    setValues,
    isFieldTouched,
} = useForm({
    initialValues: {
        [EFormFieldId.CONTENT_KEY]: '',
        [EFormFieldId.CONTENT_VALUE]: '',
    },
    validationSchema: object({
        [EFormFieldId.CONTENT_KEY]: string().required(),
        [EFormFieldId.CONTENT_VALUE]: string().required(),
    }),
});

const { isFieldInvalid } = useFormErrors(controlledValues, validationErrors, isFieldTouched);

const [contentKey, contentKeyAttrs] = defineField(EFormFieldId.CONTENT_KEY);
const [contentValue, contentValueAttrs] = defineField(EFormFieldId.CONTENT_VALUE);

watch(
    () => [contentKeys.value, visible.value],
    () => {
        if (contentKeys.value.length && !controlledValues.value[EFormFieldId.CONTENT_KEY]) {
            setValues({
                [EFormFieldId.CONTENT_KEY]: contentKeys.value[0].key,
            });
        }
    },
    { immediate: true },
);

watch(
    () => props.data,
    data => {
        if (data) {
            setValues({
                [EFormFieldId.CONTENT_KEY]: data.key,
                [EFormFieldId.CONTENT_VALUE]: data.value,
            });
        }
    },
    { immediate: true },
);

const submit = handleSubmit(values => {
    emit('submit', {
        key: values[EFormFieldId.CONTENT_KEY],
        value: values[EFormFieldId.CONTENT_VALUE],
    });
});
</script>
