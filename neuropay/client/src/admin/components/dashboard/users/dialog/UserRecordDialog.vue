<template>
    <data-record-dialog
        @hide="resetForm"
        @submit="submit"
        v-model:visible="visible"
        :header="header">
        <readonly-token-input :token="activeToken" />

        <text-input
            v-model="email"
            v-bind="emailAttrs"
            :type="ETextInputType.EMAIL"
            :invalid="isFieldInvalid(EFormFieldId.EMAIL)"
            :id="EFormFieldId.EMAIL"
            label="E-mail"
            required />
        <text-input
            v-model="password"
            v-bind="passwordAttrs"
            :type="ETextInputType.PASSWORD"
            :invalid="isFieldInvalid(EFormFieldId.PASSWORD)"
            :id="EFormFieldId.PASSWORD"
            label="Пароль"
            required />
    </data-record-dialog>
</template>

<script lang="ts" setup>
import DataRecordDialog from '@/admin/components/blocks/dialog/DataRecordDialog.vue';
import ReadonlyTokenInput from '@/admin/components/blocks/inputs/token/ReadonlyTokenInput.vue';
import TextInput from '@/shared/components/blocks/inputs/text/TextInput.vue';
import { computed, watch } from 'vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { storeToRefs } from 'pinia';
import { useFormErrors } from '@/shared/components/blocks/form/composables/formErrors';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import { useDashboardTokensStore } from '@/admin/stores';
import { ETextInputType } from '@/shared/components/blocks/inputs/text/types';
import type { DashboardUserData } from '@/admin/stores/dashboard/users/types';

enum EFormFieldId {
    EMAIL = 'user-record-form_email',
    PASSWORD = 'user-record-form_password',
}

type Props = {
    header: string
    activeTokenId: DashboardToken['id'] | null
    data?: DashboardUserData | null
}
type Emits = {
    (event: 'submit', data: DashboardUserData): void
}

const visible = defineModel<boolean>('visible', { required: true });

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { tokensById } = storeToRefs(useDashboardTokensStore());

const activeToken = computed(() => props.activeTokenId ? tokensById.value[props.activeTokenId] : null);

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
        [EFormFieldId.EMAIL]: '',
        [EFormFieldId.PASSWORD]: '',
    },
    validationSchema: object({
        [EFormFieldId.EMAIL]: string().email().required(),
        [EFormFieldId.PASSWORD]: string().required(),
    }),
});

const { isFieldInvalid } = useFormErrors(controlledValues, validationErrors, isFieldTouched);

const [email, emailAttrs] = defineField(EFormFieldId.EMAIL);
const [password, passwordAttrs] = defineField(EFormFieldId.PASSWORD);

watch(
    () => props.data,
    data => {
        if (data) {
            setValues({
                [EFormFieldId.EMAIL]: data.email,
                [EFormFieldId.PASSWORD]: data.password,
            });
        }
    },
    { immediate: true },
);

const submit = handleSubmit(values => {
    emit('submit', {
        email: values[EFormFieldId.EMAIL],
        password: values[EFormFieldId.PASSWORD],
    });
});
</script>
