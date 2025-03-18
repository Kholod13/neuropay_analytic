<template>
    <bank-card-dialog
        @submit="$emit('create-card', $event)"
        v-model:visible="visible"
        header="Новая карта" />
</template>

<script lang="ts" setup>
import BankCardDialog from './BankCardDialog.vue';
import type { CardData } from '@/dashboard/stores/cards/types';

type Emits = {
    (event: 'create-card', card: Partial<CardData>): void
}

const visible = defineModel<boolean>('visible', { required: true });
defineEmits<Emits>();
</script>
