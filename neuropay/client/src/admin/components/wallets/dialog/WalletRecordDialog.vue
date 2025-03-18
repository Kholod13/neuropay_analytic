<template>
    <data-record-dialog
        @hide="resetForm"
        @submit="submit"
        v-model:visible="visible"
        :header="header">
        <text-input
            v-model="walletAddress"
            v-bind="walletAddressAttrs"
            :type="ETextInputType.TEXT"
            :invalid="isFieldInvalid(EFormFieldId.WALLET_ADDRESS)"
            :id="EFormFieldId.WALLET_ADDRESS"
            label="Адрес кошелька"
            required />
    </data-record-dialog>
</template>

<script lang="ts" setup>
import DataRecordDialog from '@/admin/components/blocks/dialog/DataRecordDialog.vue';
import TextInput from '@/shared/components/blocks/inputs/text/TextInput.vue';
import { watch } from 'vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { ETextInputType } from '@/shared/components/blocks/inputs/text/types';
import type { Wallet } from '@/admin/stores/wallets/types';
import { useFormErrors } from '@/shared/components/blocks/form/composables/formErrors';

enum EFormFieldId {
    WALLET_ADDRESS = 'wallet-record-form_wallet-address',
}

type Props = {
    header: string
    walletAddress?: Wallet['address']
}
type Emits = {
    (event: 'submit', walletAddress: Wallet['address']): void
}

const visible = defineModel<boolean>('visible', { required: true });

const props = withDefaults(defineProps<Props>(), {
    walletAddress: '',
});
const emit = defineEmits<Emits>();

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
        [EFormFieldId.WALLET_ADDRESS]: '',
    },
    validationSchema: object({
        [EFormFieldId.WALLET_ADDRESS]: string().required(),
    }),
});

const { isFieldInvalid } = useFormErrors(controlledValues, validationErrors, isFieldTouched);

const [walletAddress, walletAddressAttrs] = defineField(EFormFieldId.WALLET_ADDRESS);

watch(
    () => props.walletAddress,
    walletAddress => {
        setValues({ [EFormFieldId.WALLET_ADDRESS]: walletAddress });
    },
    { immediate: true },
);

const submit = handleSubmit(values => {
    emit('submit', values[EFormFieldId.WALLET_ADDRESS]);
});
</script>
