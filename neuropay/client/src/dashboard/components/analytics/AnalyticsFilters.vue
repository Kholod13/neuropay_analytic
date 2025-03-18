<template>
    <date-picker-input
        v-model="fromDate"
        id="analytics-filters_from-date"
        label="Начальная дата"
        size="small" />
    <date-picker-input
        v-model="toDate"
        id="analytics-filters_to-date"
        label="Конечная дата"
        size="small" />
</template>

<script setup lang="ts">
import DatePickerInput from '@/shared/components/blocks/inputs/date/DatePickerInput.vue';

type Props = {
    size?: string
}

const fromDate = defineModel<Date | null>('fromDate', { required: true });
const toDate = defineModel<Date | null>('toDate', { required: true });

withDefaults(defineProps<Props>(), {
    size: 'normal',
});
</script>
