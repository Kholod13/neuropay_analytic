<template>
    <DataTable
        data-key="id"
        :value="cards">
        <template #empty>
            <div>Нет данных</div>
        </template>

        <Column field="externalId" header="ID" />
        <Column header="Банк">
            <template #body="slotProps">
                {{ slotProps.data.bankId ? banksById[slotProps.data.bankId]?.name : '' }}
            </template>
        </Column>
        <Column field="cardNumber" header="Номер карты" />
        <Column field="phone" header="Телефон" />
        <Column field="accountNumber" header="Номер счёта" />

        <Column>
            <template #body="slotProps">
                <div class="card-item-actions">
                    <app-button
                        @click="$emit('toggle-card-visibility', slotProps.data.id)"
                        :icon="getCardVisibilityToggleIcon(slotProps.data)"
                        severity="contrast"
                        :type="EButtonType.BUTTON"
                        text
                        rounded />
                    <app-button
                        @click="$emit('edit-card', slotProps.data.id)"
                        icon="pi pi-pencil"
                        severity="contrast"
                        :type="EButtonType.BUTTON"
                        text
                        rounded />
                    <app-button
                        @click="openRemovalConfirmationPopup($event, slotProps.data.id)"
                        icon="pi pi-trash"
                        severity="danger"
                        :type="EButtonType.BUTTON"
                        outlined
                        rounded />
                </div>
            </template>
        </Column>
    </DataTable>
</template>

<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useConfirm } from 'primevue/useconfirm';
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import { storeToRefs } from 'pinia';
import { EButtonType } from '@/shared/components/blocks/form/types';
import type { Card } from '@/dashboard/stores/cards/types';
import { useBanksStore } from '@/dashboard/stores';

type Props = {
    cards: Card[]
}
type Emits = {
    (event: 'toggle-card-visibility', cardId: Card['id']): void
    (event: 'edit-card', cardId: Card['id']): void
    (event: 'remove-card', cardId: Card['id']): void
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const { banksById } = storeToRefs(useBanksStore());

const confirm = useConfirm();

function openRemovalConfirmationPopup (event: MouseEvent, cardId: Card['id']): void {
    confirm.require({
        target: event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined,
        message: 'Удалить карту?',
        accept: () => {
            emit('remove-card', cardId);
        },
    });
}

function getCardVisibilityToggleIcon (card: Card): string {
    return card.hidden ? 'pi pi-eye-slash' : 'pi pi-eye';
}
</script>

<style scoped>
.card-item-actions {
    display: flex;
    gap: 1px;
}
</style>
