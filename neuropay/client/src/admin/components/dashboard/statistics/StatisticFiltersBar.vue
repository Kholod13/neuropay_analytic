<template>
    <content-bar styled>
        <date-picker-input
            v-model="fromDate"
            id="statistic-filters_from-date"
            label="Начальная дата"/>
        <date-picker-input
            v-model="toDate"
            id="statistic-filters_to-date"
            label="Конечная дата"/>

        <app-button
            @click="submit"
            label="Применить"
            severity="primary"
            :type="EButtonType.BUTTON"/>
    </content-bar>
</template>

<script setup lang="ts">
import ContentBar from '@/shared/components/layout/content/ContentBar.vue';
import DatePickerInput from '@/shared/components/blocks/inputs/date/DatePickerInput.vue';
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import { EButtonType } from '@/shared/components/blocks/form/types';
import type { DateRange } from '@/shared/types';
import { useToastMessage } from '@/shared/components/blocks/toast/message';
import { EMessageSeverity } from '@/shared/components/blocks/toast/types';

type Emits = {
    (event: 'submit', payload: DateRange): void
}

const fromDate = defineModel<Date | null>('fromDate', { required: true });
const toDate = defineModel<Date | null>('toDate', { required: true });

const emit = defineEmits<Emits>();

const toastMessage = useToastMessage();

function submit(): void {
    if (!fromDate.value || !toDate.value) {
        toastMessage.add({
            severity: EMessageSeverity.ERROR,
            summary: 'Ошибка',
            detail: 'Выберите даты для фильтрации',
        });
        return;
    }

    emit('submit', { from: fromDate.value, to: toDate.value });
}
</script>
