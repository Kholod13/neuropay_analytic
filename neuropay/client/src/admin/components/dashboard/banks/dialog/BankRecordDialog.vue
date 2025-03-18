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
            v-show="activeTokenId && tokenEditable"
            v-model="activeTokenId"
            :id="EFormFieldId.TOKEN_ID"
            :tokens="tokens"
            required />

        <text-input
            v-model="bankName"
            v-bind="bankNameAttrs"
            :type="ETextInputType.TEXT"
            :invalid="isFieldInvalid(EFormFieldId.BANK_NAME)"
            :id="EFormFieldId.BANK_NAME"
            label="Банк"
            required />
        <number-input
            v-model="sortOrder"
            v-bind="sortOrderAttrs"
            :invalid="isFieldInvalid(EFormFieldId.SORT_ORDER)"
            :id="EFormFieldId.SORT_ORDER"
            label="Порядок"
            required />
    </data-record-dialog>
</template>

<script lang="ts" setup>
import DataRecordDialog from '@/admin/components/blocks/dialog/DataRecordDialog.vue';
import TextInput from '@/shared/components/blocks/inputs/text/TextInput.vue';
import NumberInput from '@/shared/components/blocks/inputs/number/NumberInput.vue';
import TokensSelectInput from '@/admin/components/blocks/inputs/token/TokensSelectInput.vue';
import ReadonlyTokenInput from '@/admin/components/blocks/inputs/token/ReadonlyTokenInput.vue';
import { computed, watch } from 'vue';
import { useForm } from 'vee-validate';
import { number, object, string } from 'yup';
import { ETextInputType } from '@/shared/components/blocks/inputs/text/types';
import type { UpdateDashboardBankData } from '@/admin/stores/dashboard/banks/types';
import type { DashboardBankPayload } from '@/admin/components/dashboard/banks/dialog/types';
import { useFormErrors } from '@/shared/components/blocks/form/composables/formErrors';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import { storeToRefs } from 'pinia';
import { useDashboardTokensStore } from '@/admin/stores';

enum EFormFieldId {
    TOKEN_ID = 'bank-record-form_token-id',
    BANK_NAME = 'bank-record-form_bank-name',
    SORT_ORDER = 'bank-record-form_sort-order',
}

type Props = {
    header: string
    tokenEditable: boolean
    data?: UpdateDashboardBankData | null
}
type Emits = {
    (event: 'submit', payload: DashboardBankPayload): void
}

const visible = defineModel<boolean>('visible', { required: true });
const activeTokenId = defineModel<DashboardToken['id'] | null>('activeTokenId', { required: true });

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { tokens, tokensById } = storeToRefs(useDashboardTokensStore());

const activeToken = computed(() => activeTokenId.value ? tokensById.value[activeTokenId.value] : null);

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
        [EFormFieldId.BANK_NAME]: '',
        [EFormFieldId.SORT_ORDER]: 100,
    },
    validationSchema: object({
        [EFormFieldId.BANK_NAME]: string().required(),
        [EFormFieldId.SORT_ORDER]: number().required(),
    }),
});

const { isFieldInvalid } = useFormErrors(controlledValues, validationErrors, isFieldTouched);

const [bankName, bankNameAttrs] = defineField(EFormFieldId.BANK_NAME);
const [sortOrder, sortOrderAttrs] = defineField(EFormFieldId.SORT_ORDER);

watch(
    () => props.data,
    data => {
        if (data) {
            setValues({
                [EFormFieldId.BANK_NAME]: data.name,
                [EFormFieldId.SORT_ORDER]: Number(data.sortOrder),
            });
        }
    },
    { immediate: true },
);

const submit = handleSubmit(values => {
    emit('submit', {
        tokenId: activeTokenId.value,
        data: {
            name: values[EFormFieldId.BANK_NAME],
            sortOrder: Number(values[EFormFieldId.SORT_ORDER]),
        },
    });
});
</script>
