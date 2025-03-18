<template>
    <form-layout @submit="onSubmit">
        <text-input
            v-model="token"
            v-bind="tokenAttrs"
            :type="ETextInputType.TEXT"
            :invalid="isFieldInvalid(EFormFieldId.TOKEN)"
            :id="EFormFieldId.TOKEN"
            label="Токен"
            required />
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
        <app-button :loading="isSubmitting">Зарегистрироваться</app-button>

        <nav-link
            :route="{ name: ERouteName.DASHBOARD_LOGIN }"
            fluid>
            <app-button
                :type="EButtonType.BUTTON"
                outlined
                fluid>Войти</app-button>
        </nav-link>
    </form-layout>
</template>

<script lang="ts" setup>
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import FormLayout from '@/shared/components/layout/form/FormLayout.vue';
import TextInput from '@/shared/components/blocks/inputs/text/TextInput.vue';
import NavLink from '@/shared/components/navigation/NavLink.vue';
import { useForm } from 'vee-validate';
import { object, string } from 'yup';
import { useRouter } from 'vue-router';
import { ETextInputType } from '@/shared/components/blocks/inputs/text/types';
import { useFormErrors } from '@/shared/components/blocks/form/composables/formErrors';
import { userApi } from '@/shared/server-api';
import { ELoginStatus } from '@/shared/server-api/dashboard/user/types';
import { useToastMessage } from '@/shared/components/blocks/toast/message';
import { EMessageGroup, EMessageSeverity } from '@/shared/components/blocks/toast/types';
import { ERouteName } from '@/router/types';
import { EButtonType } from '@/shared/components/blocks/form/types';

enum EFormFieldId {
    TOKEN = 'signup-form_token-input',
    EMAIL = 'signup-form_email-input',
    PASSWORD = 'signup-form_password-input',
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
        [EFormFieldId.TOKEN]: '',
        [EFormFieldId.EMAIL]: '',
        [EFormFieldId.PASSWORD]: '',
    },
    validationSchema: object({
        [EFormFieldId.TOKEN]: string().required(),
        [EFormFieldId.EMAIL]: string().email().required(),
        [EFormFieldId.PASSWORD]: string().required(),
    }),
});

const { isFieldInvalid } = useFormErrors(controlledValues, validationErrors, isFieldTouched);

const [token, tokenAttrs] = defineField(EFormFieldId.TOKEN);
const [email, emailAttrs] = defineField(EFormFieldId.EMAIL);
const [password, passwordAttrs] = defineField(EFormFieldId.PASSWORD);

const onSubmit = handleSubmit(async values => {
    const response = await userApi.signup(
        values[EFormFieldId.TOKEN],
        values[EFormFieldId.EMAIL],
        values[EFormFieldId.PASSWORD],
    );
    if (response.status !== ELoginStatus.SUCCESS) {
        await toastMessage.add({
            group: EMessageGroup.PRIMARY,
            severity: EMessageSeverity.ERROR,
            summary: 'Ошибка',
            detail: response.message ?? 'Не удалось зарегистрироваться.',
        });
        return;
    }

    await router.push({ name: ERouteName.DASHBOARD_HOME });
});
</script>
