<template>
    <DataTable :value="orders">
        <Column header="ID">
            <template #body>
                <order-column-skeleton />
            </template>
        </Column>

        <Column header="Реквизиты">
            <template #body>
                <order-column-skeleton />
            </template>
        </Column>

        <Column header="Сумма">
            <template #body>
                <order-column-skeleton />
            </template>
        </Column>

        <Column header="Валюта">
            <template #body>
                <order-column-skeleton />
            </template>
        </Column>

        <Column header="Курс/Мой курс">
            <template #body>
                <order-column-skeleton />
            </template>
        </Column>

        <Column header="Бонус к сделке %">
            <template #body>
                <order-column-skeleton />
            </template>
        </Column>

        <Column>
            <template #body>
                <app-button
                    label="Принять"
                    severity="success"
                    size="small"
                    :type="EButtonType.BUTTON"  />
            </template>
        </Column>
    </DataTable>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import OrderColumnSkeleton from './OrderColumnSkeleton.vue';
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import { EButtonType } from '@/shared/components/blocks/form/types';

defineProps<{
    orders: Record<string, unknown>[];
}>();
</script>
