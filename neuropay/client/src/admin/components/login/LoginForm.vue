<template>
    <form-layout @submit="onSubmit">
        <text-input
            v-model="login"
            v-bind="loginAttrs"
            :invalid="isFieldInvalid(EFormFieldId.LOGIN)"
            :id="EFormFieldId.LOGIN"
            label="Логин"
            required />
        <text-input
            v-model="password"
            v-bind="passwordAttrs"
            :type="ETextInputType.PASSWORD"
            :invalid="isFieldInvalid(EFormFieldId.PASSWORD)"
            :id="EFormFieldId.PASSWORD"
            label="Пароль"
            required />
        <app-button :loading="isSubmitting">Войти</app-button>
    </form-layout>
</template>

<script lang="ts" setup>
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import FormLayout from '@/shared/components/layout/form/FormLayout.vue';
import TextInput from '@/shared/components/blocks/inputs/text/TextInput.vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useRouter } from 'vue-router';
import { ETextInputType } from '@/shared/components/blocks/inputs/text/types';
import { useFormErrors } from '@/shared/components/blocks/form/composables/formErrors';
import { adminUserApi } from '@/shared/server-api';
import { EAdminSigninStatus } from '@/shared/server-api/admin/user/types';
import { useToastMessage } from '@/shared/components/blocks/toast/message';
import { EMessageGroup, EMessageSeverity } from '@/shared/components/blocks/toast/types';
import { ERouteName } from '@/router/types';

enum EFormFieldId {
    LOGIN = 'login-form_login-input',
    PASSWORD = 'login-form_password-input',
}

const router = useRouter();
const toastMessage = useToastMessage();

const {
    controlledValues,
    errors: validationErrors,
    handleSubmit,
    defineField,
    isSubmitting,
    isFieldTouched,
} = useForm({
    initialValues: {
        [EFormFieldId.LOGIN]: '',
        [EFormFieldId.PASSWORD]: '',
    },
    validationSchema: object({
        [EFormFieldId.LOGIN]: string().required(),
        [EFormFieldId.PASSWORD]: string().required(),
    }),
});

const { isFieldInvalid } = useFormErrors(controlledValues, validationErrors, isFieldTouched);

const [login, loginAttrs] = defineField(EFormFieldId.LOGIN);
const [password, passwordAttrs] = defineField(EFormFieldId.PASSWORD);

const onSubmit = handleSubmit(async values => {
    const response = await adminUserApi.signin(values[EFormFieldId.LOGIN], values[EFormFieldId.PASSWORD]);
    if (response.status !== EAdminSigninStatus.SUCCESS) {
        await toastMessage.add({
            group: EMessageGroup.PRIMARY,
            severity: EMessageSeverity.ERROR,
            summary: 'Ошибка',
            detail: response.message ?? 'Неверный логин или пароль.',
        });
        return;
    }

    await router.push({ name: ERouteName.ADMIN_DASHBOARD_TOKENS });
});
</script>
