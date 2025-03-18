<template>
    <add-bank-card-dialog
        @create-card="createCardWithLoading"
        v-model:visible="addCardDialogVisible" />
    <edit-bank-card-dialog
        @update-card="updateCardWithLoading"
        v-model:card-id="editingCardId" />

    <page-layout>
        <content-container>
            <content-header
                title="Карты и кошельки"
                icon="pi pi-wallet">
                <template #actions>
                    <app-button
                        @click="openAddCardDialog"
                        label="Добавить"
                        icon="pi pi-plus"
                        severity="primary"
                        :type="EButtonType.BUTTON" />
                </template>
            </content-header>

            <bank-card-tabs-bar v-model="activeTabId" />

            <content-body>
                <bank-cards-table
                    @toggle-card-visibility="toggleCardVisibilityWithLoading"
                    @edit-card="openEditCardDialog"
                    @remove-card="removeCardWithLoading"
                    :cards="cards" />
            </content-body>
        </content-container>
    </page-layout>
</template>

<script lang="ts" setup>
import BankCardTabsBar from '@/dashboard/components/bank-card/tabs/BankCardTabsBar.vue';
import PageLayout from '@/dashboard/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import ContentHeader from '@/shared/components/layout/content/ContentHeader.vue';
import ContentBody from '@/shared/components/layout/content/ContentBody.vue';
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import BankCardsTable from '@/dashboard/components/bank-card/BankCardsTable.vue';
import AddBankCardDialog from '@/dashboard/components/bank-card/dialog/AddBankCardDialog.vue';
import EditBankCardDialog from '@/dashboard/components/bank-card/dialog/EditBankCardDialog.vue';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useApplicationStore } from '@/shared/stores';
import { useBanksStore, useCardsStore } from '@/dashboard/stores';
import { EButtonType } from '@/shared/components/blocks/form/types';
import type { Card } from '@/dashboard/stores/cards/types';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { EBankCardTabId } from '@/dashboard/components/bank-card/tabs/types';
import { useToastMessage } from '@/shared/components/blocks/toast/message';
import { EMessageGroup, EMessageSeverity } from '@/shared/components/blocks/toast/types';

const { wrapLoading } = useApplicationStore();

const {
    loadCards,
    createCard,
    updateCard,
    removeCard,
    toggleCardVisibility,
} = useCardsStore();
const { visibleCards, hiddenCards } = storeToRefs(useCardsStore());

const { loadBanks } = useBanksStore();

const toastMessage = useToastMessage();

const addCardDialogVisible = ref(false);

const editingCardId = ref<Card['id'] | null>(null);

const activeTabId = ref(EBankCardTabId.ACTIVE);

const cards = computed(() => activeTabId.value === EBankCardTabId.ACTIVE ? visibleCards.value : hiddenCards.value);

useViewHelper(async () => Promise.all([
    loadCards(),
    loadBanks(),
]));

async function openAddCardDialog (): Promise<void> {
    addCardDialogVisible.value = true;
    await loadBanks();
}

async function openEditCardDialog (cardId: Card['id']): Promise<void> {
    editingCardId.value = cardId;
    await loadBanks();
}

async function createCardWithLoading (card: Partial<Card>): Promise<void> {
    await wrapLoading(async () => {
        try {
            await createCard({
                ...card,
                hidden: activeTabId.value === EBankCardTabId.HIDDEN,
            });
        } catch (error) {
            await toastMessage.add({
                group: EMessageGroup.PRIMARY,
                severity: EMessageSeverity.ERROR,
                summary: 'Ошибка',
                detail: 'Произошла ошибка при добавлении карты.',
            });
            return;
        }

        await toastMessage.add({
            group: EMessageGroup.PRIMARY,
            severity: EMessageSeverity.SUCCESS,
            summary: 'Успешно',
            detail: 'Карта добавлена.',
        });
        addCardDialogVisible.value = false;
    });
}

async function updateCardWithLoading (card: Partial<Card>): Promise<void> {
    const cardId = editingCardId.value;
    if (!cardId) {
        return;
    }

    await wrapLoading(async () => {
        try {
            await updateCard(cardId, card);
        } catch (error) {
            await toastMessage.add({
                group: EMessageGroup.PRIMARY,
                severity: EMessageSeverity.ERROR,
                summary: 'Ошибка',
                detail: 'Произошла ошибка при изменении карты.',
            });
            return;
        }

        await toastMessage.add({
            group: EMessageGroup.PRIMARY,
            severity: EMessageSeverity.SUCCESS,
            summary: 'Успешно',
            detail: 'Карта изменена.',
        });
        editingCardId.value = null;
    });
}

async function removeCardWithLoading (cardId: Card['id']): Promise<void> {
    await wrapLoading(async () => removeCard(cardId));

    await toastMessage.add({
        group: EMessageGroup.PRIMARY,
        severity: EMessageSeverity.SUCCESS,
        summary: 'Успешно',
        detail: 'Карта удалена.',
    });
}

async function toggleCardVisibilityWithLoading (cardId: Card['id']): Promise<void> {
    await wrapLoading(async () => toggleCardVisibility(cardId));

    await toastMessage.add({
        group: EMessageGroup.PRIMARY,
        severity: EMessageSeverity.SUCCESS,
        summary: 'Успешно',
        detail: 'Статус карты изменён.',
    });
}
</script>
