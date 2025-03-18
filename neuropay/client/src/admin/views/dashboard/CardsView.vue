<template>
    <page-layout>
        <content-container>
            <content-header
                title="Карты и кошельки"
                icon="pi pi-credit-card" />

            <content-body>
                <cards-table
                    @remove-card="deleteCardAction"
                    @remove-token-cards="deleteAllTokenCardsAction"
                    :cards="cards" />
            </content-body>
        </content-container>
    </page-layout>
</template>

<script setup lang="ts">
import PageLayout from '@/admin/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import ContentHeader from '@/shared/components/layout/content/ContentHeader.vue';
import ContentBody from '@/shared/components/layout/content/ContentBody.vue';
import CardsTable from '@/admin/components/dashboard/cards/CardsTable.vue';
import { storeToRefs } from 'pinia';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { useDashboardCardsStore } from '@/admin/stores';
import { useApiAction } from '@/admin/components/api/action';

const { cards } = storeToRefs(useDashboardCardsStore());

const { loadCards, deleteCard, deleteAllTokenCards } = useDashboardCardsStore();

const deleteCardAction = useApiAction(deleteCard);
const deleteAllTokenCardsAction = useApiAction(deleteAllTokenCards);

useViewHelper(loadCards);
</script>
