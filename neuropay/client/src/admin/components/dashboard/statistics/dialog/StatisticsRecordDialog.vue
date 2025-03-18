<template>
    <data-record-dialog
        @hide="resetForm"
        @submit="submit"
        v-model:visible="visible"
        :header="header">
        <readonly-token-input :token="activeToken" />

        <date-picker-input
            v-show="daily"
            v-model="dateField"
            v-bind="dateFieldAttrs"
            :id="EFormFieldId.DATE"
            label="Дата"
            :invalid="isFieldInvalid(EFormFieldId.DATE)"
            fluid />

        <number-input
            v-model="profit"
            v-bind="profitAttrs"
            :invalid="isFieldInvalid(EFormFieldId.PROFIT)"
            :id="EFormFieldId.PROFIT"
            label="Прибыль"
            float
            required />
        <number-input
            v-model="transactionsCount"
            v-bind="transactionsCountAttrs"
            :invalid="isFieldInvalid(EFormFieldId.TRANSACTIONS_COUNT)"
            :id="EFormFieldId.TRANSACTIONS_COUNT"
            label="Кол-во сделок"
            required />
    </data-record-dialog>
</template>

<script lang="ts" setup>
import DataRecordDialog from '@/admin/components/blocks/dialog/DataRecordDialog.vue';
import NumberInput from '@/shared/components/blocks/inputs/number/NumberInput.vue';
import DatePickerInput from '@/shared/components/blocks/inputs/date/DatePickerInput.vue';
import ReadonlyTokenInput from '@/admin/components/blocks/inputs/token/ReadonlyTokenInput.vue';
import { computed, watch } from 'vue';
import { useForm } from 'vee-validate';
import { date, number, object } from 'yup';
import { storeToRefs } from 'pinia';
import { useFormErrors } from '@/shared/components/blocks/form/composables/formErrors';
import type { UpdateDashboardStatisticsData } from '@/admin/stores/dashboard/statistics/types';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import { useDashboardTokensStore } from '@/admin/stores';

enum EFormFieldId {
    DATE = 'statistics-record-form_date',
    PROFIT = 'statistics-record-form_profit',
    TRANSACTIONS_COUNT = 'statistics-record-form_transactions_count',
}

type Props = {
    header: string
    activeTokenId: DashboardToken['id'] | null
    daily: boolean
    data?: UpdateDashboardStatisticsData | null
}
type Emits = {
    (event: 'submit', data: UpdateDashboardStatisticsData): void
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
        [EFormFieldId.DATE]: new Date() as Date | null,
        [EFormFieldId.PROFIT]: 0.00,
        [EFormFieldId.TRANSACTIONS_COUNT]: 0,
    },
    validationSchema: object({
        [EFormFieldId.DATE]: date().nullable().when({
            is: () => props.daily,
            then: () => date().required(),
        }),
        [EFormFieldId.PROFIT]: number().required(),
        [EFormFieldId.TRANSACTIONS_COUNT]: number().required(),
    }),
});

const { isFieldInvalid } = useFormErrors(controlledValues, validationErrors, isFieldTouched);

const [dateField, dateFieldAttrs] = defineField(EFormFieldId.DATE);
const [profit, profitAttrs] = defineField(EFormFieldId.PROFIT);
const [transactionsCount, transactionsCountAttrs] = defineField(EFormFieldId.TRANSACTIONS_COUNT);

watch(
    () => props.data,
    data => {
        if (data) {
            setValues({
                [EFormFieldId.DATE]: data.date ?? null,
                [EFormFieldId.PROFIT]: Number(data.profit),
                [EFormFieldId.TRANSACTIONS_COUNT]: Number(data.transactionsCount),
            });
        }
    },
    { immediate: true },
);

const submit = handleSubmit(values => {
    emit('submit', {
        date: props.daily ? values[EFormFieldId.DATE] ?? undefined : undefined,
        profit: Number(values[EFormFieldId.PROFIT]),
        transactionsCount: Number(values[EFormFieldId.TRANSACTIONS_COUNT]),
    });
});
</script>
