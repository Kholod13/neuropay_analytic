<template>
    <bank-card-dialog
        @submit="$emit('update-card', $event)"
        @update:visible="closeDialog"
        :visible="isValue(cardId)"
        header="Редактировать карту"
        :card="card" />
</template>

<script lang="ts" setup>
import BankCardDialog from './BankCardDialog.vue';
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useCardsStore } from '@/dashboard/stores';
import type { Card, CardData } from '@/dashboard/stores/cards/types';
import { isValue } from '@/shared/utils/typeUtils';

type Emits = {
    (event: 'update-card', card: Partial<CardData>): void
}

const cardId = defineModel<Card['id'] | null>('cardId', { required: true });
defineEmits<Emits>();

const { cardsById } = storeToRefs(useCardsStore());

const card = computed(() =>
    cardId.value
        ? (cardsById.value[cardId.value] ?? null)
        : null,
);

function closeDialog (): void {
    cardId.value = null;
}
</script>
