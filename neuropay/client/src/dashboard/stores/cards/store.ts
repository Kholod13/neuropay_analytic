import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { EPiniaStore } from '@/stores/types';
import type { Card, CardData } from './types';
import { cardsApi } from '@/shared/server-api';

export const useCardsStore = defineStore(EPiniaStore.DASHBOARD_CARDS, () => {
    const cards = ref<Card[]>([]);

    const cardsById = computed(() =>
        Object.fromEntries(cards.value.map(card => [card.id, card])),
    );

    const visibleCards = computed(() => cards.value.filter(card => !card.hidden));
    const hiddenCards = computed(() => cards.value.filter(card => card.hidden));

    async function loadCards (): Promise<void> {
        const cardDataList = await cardsApi.getAll();

        cards.value = cardDataList.map(cardData => ({
            id: cardData.id,
            externalId: cardData.external_id,
            bankId: cardData.bank_id,
            cardNumber: cardData.card_number,
            accountNumber: cardData.account_number,
            phone: cardData.phone_number,
            hidden: cardData.hidden,
        }));
    }

    async function createCard (card: Partial<CardData>): Promise<void> {
        await cardsApi.create({
            bank_id: card.bankId,
            card_number: card.cardNumber,
            account_number: card.accountNumber,
            phone_number: card.phone,
            hidden: card.hidden,
        });

        await loadCards();
    }

    async function updateCard (id: Card['id'], card: Partial<CardData>): Promise<void> {
        await cardsApi.update(id, {
            bank_id: card.bankId,
            card_number: card.cardNumber,
            account_number: card.accountNumber,
            phone_number: card.phone,
            hidden: card.hidden,
        });

        await loadCards();
    }

    async function removeCard (cardId: Card['id']): Promise<void> {
        await cardsApi.remove(cardId);
        await loadCards();
    }

    async function toggleCardVisibility (cardId: Card['id']): Promise<void> {
        const card = cardsById.value[cardId];
        await updateCard(cardId, { hidden: !card.hidden });
    }

    return {
        cards,

        cardsById,
        visibleCards,
        hiddenCards,

        loadCards,
        createCard,
        updateCard,
        removeCard,
        toggleCardVisibility,
    };
});

export type CardsStoreDefinition = ReturnType<typeof useCardsStore>
