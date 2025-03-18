<template>
    <div
        class="data-row-actions"
        :class="{ 'can-add': canAdd }">
        <app-button
            v-if="canAdd"
            @click="$emit('add')"
            icon="pi pi-plus"
            severity="primary"
            :type="EButtonType.BUTTON"
            rounded />
        <app-button
            v-if="canEdit"
            @click="$emit('edit')"
            icon="pi pi-pencil"
            severity="contrast"
            :type="EButtonType.BUTTON"
            text
            rounded/>
        <app-button
            v-if="canRemove"
            @click="openRemovalConfirmationPopup"
            icon="pi pi-trash"
            severity="danger"
            :type="EButtonType.BUTTON"
            outlined
            rounded/>
    </div>
</template>

<script setup lang="ts">
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import { useConfirm } from 'primevue/useconfirm';
import { EButtonType } from '@/shared/components/blocks/form/types';

type Props = {
    canAdd?: boolean
    canEdit?: boolean
    canRemove?: boolean
    removalConfirmationMessage?: string
}
type Emits = {
    (event: 'add'): void
    (event: 'edit'): void
    (event: 'remove'): void
}

const props = withDefaults(defineProps<Props>(), {
    canAdd: false,
    canEdit: true,
    canRemove: true,
    removalConfirmationMessage: 'Удалить запись?',
});
const emit = defineEmits<Emits>();

const confirm = useConfirm();

function openRemovalConfirmationPopup (event: MouseEvent): void {
    confirm.require({
        target: event.currentTarget instanceof HTMLElement ? event.currentTarget : undefined,
        message: props.removalConfirmationMessage,
        accept: () => {
            emit('remove');
        },
    });
}
</script>

<style scoped>
.data-row-actions {
    display: flex;
    gap: 1px;
}

.data-row-actions.can-add {
    gap: 5px;
}
</style>
