<template>
    <data-record-dialog
        @hide="resetForm"
        @submit="submit"
        v-model:visible="visible"
        :header="header">
        <text-input
            v-model="token"
            v-bind="tokenAttrs"
            :type="ETextInputType.TEXT"
            :id="EFormFieldId.TOKEN"
            :invalid="isFieldInvalid(EFormFieldId.TOKEN)"
            label="Токен"
            required />

        <wallets-select-input
            v-model="walletId"
            v-bind="walletIdAttrs"
            :id="EFormFieldId.WALLET_ID"
            :wallets="wallets"
            required />

        <number-input
            v-model="securityDeposit"
            v-bind="securityDepositAttrs"
            :id="EFormFieldId.SECURITY_DEPOSIT"
            :invalid="isFieldInvalid(EFormFieldId.SECURITY_DEPOSIT)"
            label="Страховой депозит"
            float
            required />

        <number-input
            v-model="workingDeposit"
            v-bind="workingDepositAttrs"
            :id="EFormFieldId.WORKING_DEPOSIT"
            :invalid="isFieldInvalid(EFormFieldId.WORKING_DEPOSIT)"
            label="Рабочий депозит"
            float
            required />

        <number-input
            v-model="frozenDeposit"
            v-bind="frozenDepositAttrs"
            :id="EFormFieldId.FROZEN_DEPOSIT"
            :invalid="isFieldInvalid(EFormFieldId.FROZEN_DEPOSIT)"
            label="Замороженный депозит"
            float
            required />

        <number-input
            v-model="rate"
            v-bind="rateAttrs"
            :id="EFormFieldId.RATE"
            :invalid="isFieldInvalid(EFormFieldId.RATE)"
            label="Ставка %"
            required />

        <text-input
            v-model="currency"
            v-bind="currencyAttrs"
            :type="ETextInputType.TEXT"
            :id="EFormFieldId.CURRENCY"
            :invalid="isFieldInvalid(EFormFieldId.CURRENCY)"
            label="Валюта"
            required />
    </data-record-dialog>
</template>

<script lang="ts" setup>
import DataRecordDialog from '@/admin/components/blocks/dialog/DataRecordDialog.vue';
import TextInput from '@/shared/components/blocks/inputs/text/TextInput.vue';
import NumberInput from '@/shared/components/blocks/inputs/number/NumberInput.vue';
import WalletsSelectInput from '@/admin/components/blocks/inputs/wallet/WalletsSelectInput.vue';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { number, object, string } from 'yup';
import { ETextInputType } from '@/shared/components/blocks/inputs/text/types';
import type { DashboardTokenData } from '@/admin/stores/dashboard/tokens/types';
import { useFormErrors } from '@/shared/components/blocks/form/composables/formErrors';
import { useWalletsStore } from '@/admin/stores';

enum EFormFieldId {
    TOKEN = 'token-record-form_token',
    WALLET_ID = 'token-record-form_walled-id',
    SECURITY_DEPOSIT = 'token-record-form_security-deposit',
    WORKING_DEPOSIT = 'token-record-form_working-deposit',
    FROZEN_DEPOSIT = 'token-record-form_frozen-deposit',
    RATE = 'token-record-form_rate',
    CURRENCY = 'token-record-form_currency',
}

type Props = {
    header: string
    data?: DashboardTokenData | null
}
type Emits = {
    (event: 'submit', data: DashboardTokenData): void
}

const visible = defineModel<boolean>('visible', { required: true });

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { wallets } = storeToRefs(useWalletsStore());

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
        [EFormFieldId.TOKEN]: '',
        [EFormFieldId.WALLET_ID]: '',
        [EFormFieldId.SECURITY_DEPOSIT]: 0,
        [EFormFieldId.WORKING_DEPOSIT]: 0,
        [EFormFieldId.FROZEN_DEPOSIT]: 0,
        [EFormFieldId.RATE]: 8,
        [EFormFieldId.CURRENCY]: 'RUB',
    },
    validationSchema: object({
        [EFormFieldId.TOKEN]: string().required(),
        [EFormFieldId.WALLET_ID]: string().required(),
        [EFormFieldId.SECURITY_DEPOSIT]: number().required(),
        [EFormFieldId.WORKING_DEPOSIT]: number().required(),
        [EFormFieldId.FROZEN_DEPOSIT]: number().required(),
        [EFormFieldId.RATE]: number().required(),
        [EFormFieldId.CURRENCY]: string().required(),
    }),
});

const { isFieldInvalid } = useFormErrors(controlledValues, validationErrors, isFieldTouched);

const [token, tokenAttrs] = defineField(EFormFieldId.TOKEN);
const [walletId, walletIdAttrs] = defineField(EFormFieldId.WALLET_ID);
const [securityDeposit, securityDepositAttrs] = defineField(EFormFieldId.SECURITY_DEPOSIT);
const [workingDeposit, workingDepositAttrs] = defineField(EFormFieldId.WORKING_DEPOSIT);
const [frozenDeposit, frozenDepositAttrs] = defineField(EFormFieldId.FROZEN_DEPOSIT);
const [rate, rateAttrs] = defineField(EFormFieldId.RATE);
const [currency, currencyAttrs] = defineField(EFormFieldId.CURRENCY);

watch(
    () => props.data,
    data => {
        if (data) {
            setValues({
                [EFormFieldId.TOKEN]: data.token,
                [EFormFieldId.WALLET_ID]: data.walletId,
                [EFormFieldId.SECURITY_DEPOSIT]: Number(data.securityDeposit),
                [EFormFieldId.WORKING_DEPOSIT]: Number(data.workingDeposit),
                [EFormFieldId.FROZEN_DEPOSIT]: Number(data.frozenDeposit),
                [EFormFieldId.RATE]: Number(data.rate),
                [EFormFieldId.CURRENCY]: data.currency,
            });
        }
    },
    { immediate: true },
);

watch(
    () => [wallets.value, visible.value],
    () => {
        if (wallets.value.length && !controlledValues.value[EFormFieldId.WALLET_ID]) {
            setValues({ [EFormFieldId.WALLET_ID]: wallets.value[0].id });
        }
    },
    { immediate: true },
);

const submit = handleSubmit(values => {
    emit('submit', {
        token: values[EFormFieldId.TOKEN],
        walletId: values[EFormFieldId.WALLET_ID],
        securityDeposit: Number(values[EFormFieldId.SECURITY_DEPOSIT]),
        workingDeposit: Number(values[EFormFieldId.WORKING_DEPOSIT]),
        frozenDeposit: Number(values[EFormFieldId.FROZEN_DEPOSIT]),
        rate: Number(values[EFormFieldId.RATE]),
        currency: values[EFormFieldId.CURRENCY],
    });
});
</script>
