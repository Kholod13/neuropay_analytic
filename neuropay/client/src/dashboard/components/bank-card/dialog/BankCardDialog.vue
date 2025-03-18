<template>
    <Dialog
        v-model:visible="visible"
        :dt="themeOverrides"
        :header="header"
        modal>
        <div class="container">
            <div class="form-container">
                <text-input
                    v-model="cardOwner"
                    v-bind="cardOwnerAttrs"
                    :type="ETextInputType.TEXT"
                    :id="EFormFieldId.CARD_OWNER"
                    label="Имя владельца карты" />

                <select-input
                    v-model="bankId"
                    v-bind="bankIdAttrs"
                    :id="EFormFieldId.BANK_ID"
                    label="Банк"
                    :options="banks"
                    option-label="name"
                    option-value="id" />

                <form-row>
                    <text-input
                        v-model="cardNumber"
                        v-bind="cardNumberAttrs"
                        :type="ETextInputType.CARD_NUMBER"
                        :id="EFormFieldId.CARD_NUMBER"
                        label="Номер карты" />
                    <text-input
                        v-model="expirationDate"
                        v-bind="expirationDateAttrs"
                        :type="ETextInputType.CARD_EXPIRATION_DATE"
                        :id="EFormFieldId.EXPIRATION_DATE"
                        label="Срок действия" />
                </form-row>

                <toggle-checkbox
                    v-model="sbp"
                    v-bind="sbpAttrs"
                    :name="EFormFieldId.SBP"
                    :input-id="EFormFieldId.SBP"
                    label="СБП" />

                <text-input
                    v-model="accountNumber"
                    v-bind="accountNumberAttrs"
                    :type="ETextInputType.TEXT"
                    :id="EFormFieldId.ACCOUNT_NUMBER"
                    label="Номер счета" />

                <text-input
                    v-model="phoneNumber"
                    v-bind="phoneNumberAttrs"
                    :type="ETextInputType.TEL"
                    :id="EFormFieldId.PHONE_NUMBER"
                    label="Номер телефона" />

                <form-row>
                    <text-input
                        v-model="dailyLimit"
                        v-bind="dailyLimitAttrs"
                        :type="ETextInputType.TEXT"
                        :id="EFormFieldId.DAILY_LIMIT"
                        label="Дневной лимит" />
                    <text-input
                        v-model="minOrder"
                        v-bind="minOrderAttrs"
                        :type="ETextInputType.TEXT"
                        :id="EFormFieldId.MIN_ORDER"
                        label="MIN ордер" />
                    <text-input
                        v-model="maxOrder"
                        v-bind="maxOrderAttrs"
                        :type="ETextInputType.TEXT"
                        :id="EFormFieldId.MAX_ORDER"
                        label="MAX ордер" />
                </form-row>

                <text-input
                    v-model="maxPaymentsPerDay"
                    v-bind="maxPaymentsPerDayAttrs"
                    :type="ETextInputType.TEXT"
                    :id="EFormFieldId.MAX_PAYMENTS_PER_DAY"
                    label="MAX платежей в сутки" />
            </div>

            <div class="actions">
                <app-button
                    @click="closeDialog"
                    label="Отменить"
                    icon="pi pi-times"
                    severity="contrast"
                    :type="EButtonType.BUTTON"
                    text />
                <app-button
                    @click="submit"
                    label="Сохранить"
                    icon="pi pi-check"
                    severity="success"
                    :type="EButtonType.BUTTON" />
            </div>
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import TextInput from '@/shared/components/blocks/inputs/text/TextInput.vue';
import SelectInput from '@/shared/components/blocks/inputs/select/SelectInput.vue';
import ToggleCheckbox from '@/shared/components/blocks/inputs/checkbox/ToggleCheckbox.vue';
import FormRow from '@/shared/components/blocks/form/FormRow.vue';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useForm } from 'vee-validate';
import { boolean, object, string } from 'yup';
import { useBanksStore } from '@/dashboard/stores';
import { EButtonType } from '@/shared/components/blocks/form/types';
import { ETextInputType } from '@/shared/components/blocks/inputs/text/types';
import { useToastMessage } from '@/shared/components/blocks/toast/message';
import { EMessageGroup, EMessageSeverity } from '@/shared/components/blocks/toast/types';
import type { CardData } from '@/dashboard/stores/cards/types';

enum EFormFieldId {
    CARD_OWNER = 'add-bank-card-form_card-owner',
    BANK_ID = 'add-bank-card-form_bank-id',
    CARD_NUMBER = 'add-bank-card-form_card-number',
    EXPIRATION_DATE = 'add-bank-card-form_expiration-date',
    SBP = 'add-bank-card-form_sbp',
    ACCOUNT_NUMBER = 'add-bank-card-form_account-number',
    PHONE_NUMBER = 'add-bank-card-form_phone-number',
    DAILY_LIMIT = 'add-bank-card-form_daily-limit',
    MIN_ORDER = 'add-bank-card-form_min-order',
    MAX_ORDER = 'add-bank-card-form_max-order',
    MAX_PAYMENTS_PER_DAY = 'add-bank-card-form_max-payments-per-day',
}

type Props = {
    header: string
    card?: Partial<CardData> | null
}
type Emits = {
    (event: 'submit', card: Partial<CardData>): void
}

const visible = defineModel<boolean>('visible', { required: true });
const props = withDefaults(defineProps<Props>(), {
    card: null,
});
const emit = defineEmits<Emits>();

const { banks } = storeToRefs(useBanksStore());
const toastMessage = useToastMessage();

const themeOverrides = ref({
    header: {
        padding: '1.5rem 1.5rem 0',
    },
});

const {
    handleSubmit,
    defineField,
    resetForm,
    setValues,
} = useForm({
    initialValues: {
        [EFormFieldId.CARD_OWNER]: '',
        [EFormFieldId.BANK_ID]: '',
        [EFormFieldId.CARD_NUMBER]: '',
        [EFormFieldId.EXPIRATION_DATE]: '',
        [EFormFieldId.SBP]: false,
        [EFormFieldId.ACCOUNT_NUMBER]: '',
        [EFormFieldId.PHONE_NUMBER]: '',
        [EFormFieldId.DAILY_LIMIT]: '',
        [EFormFieldId.MIN_ORDER]: '',
        [EFormFieldId.MAX_ORDER]: '',
        [EFormFieldId.MAX_PAYMENTS_PER_DAY]: '',
    },
    validationSchema: object({
        [EFormFieldId.CARD_OWNER]: string(),
        [EFormFieldId.BANK_ID]: string(),
        [EFormFieldId.CARD_NUMBER]: string(),
        [EFormFieldId.EXPIRATION_DATE]: string(),
        [EFormFieldId.SBP]: boolean(),
        [EFormFieldId.ACCOUNT_NUMBER]: string(),
        [EFormFieldId.PHONE_NUMBER]: string(),
        [EFormFieldId.DAILY_LIMIT]: string(),
        [EFormFieldId.MIN_ORDER]: string(),
        [EFormFieldId.MAX_ORDER]: string(),
        [EFormFieldId.MAX_PAYMENTS_PER_DAY]: string(),
    }),
});

const [cardOwner, cardOwnerAttrs] = defineField(EFormFieldId.CARD_OWNER);
const [bankId, bankIdAttrs] = defineField(EFormFieldId.BANK_ID);
const [cardNumber, cardNumberAttrs] = defineField(EFormFieldId.CARD_NUMBER);
const [expirationDate, expirationDateAttrs] = defineField(EFormFieldId.EXPIRATION_DATE);
const [sbp, sbpAttrs] = defineField(EFormFieldId.SBP);
const [accountNumber, accountNumberAttrs] = defineField(EFormFieldId.ACCOUNT_NUMBER);
const [phoneNumber, phoneNumberAttrs] = defineField(EFormFieldId.PHONE_NUMBER);
const [dailyLimit, dailyLimitAttrs] = defineField(EFormFieldId.DAILY_LIMIT);
const [minOrder, minOrderAttrs] = defineField(EFormFieldId.MIN_ORDER);
const [maxOrder, maxOrderAttrs] = defineField(EFormFieldId.MAX_ORDER);
const [maxPaymentsPerDay, maxPaymentsPerDayAttrs] = defineField(EFormFieldId.MAX_PAYMENTS_PER_DAY);

watch(visible, value => {
    if (!value) {
        resetForm();
    }
});

watch(
    () => props.card,
    card => {
        setValues({
            [EFormFieldId.BANK_ID]: card?.bankId ?? '',
            [EFormFieldId.CARD_NUMBER]: card?.cardNumber ?? '',
            [EFormFieldId.ACCOUNT_NUMBER]: card?.accountNumber ?? '',
            [EFormFieldId.PHONE_NUMBER]: card?.phone ?? '',
        });
    },
    { immediate: true },
);

function closeDialog (): void {
    visible.value = false;
}

const submit = handleSubmit(async values => {
    if (Object.values(values).every(value => !value)) {
        await toastMessage.add({
            group: EMessageGroup.PRIMARY,
            severity: EMessageSeverity.ERROR,
            summary: 'Ошибка',
            detail: 'Заполните необходимые поля.',
        });
        return;
    }

    emit('submit', {
        bankId: values[EFormFieldId.BANK_ID],
        cardNumber: values[EFormFieldId.CARD_NUMBER],
        accountNumber: values[EFormFieldId.ACCOUNT_NUMBER],
        phone: values[EFormFieldId.PHONE_NUMBER],
    });
});
</script>

<style scoped>
.container {
    padding-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    align-items: center;
}

.form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
