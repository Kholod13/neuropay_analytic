<template>
    <Dialog
        v-model:visible="visible"
        class="data-record-dialog"
        :dt="themeOverrides"
        :header="header"
        modal>
        <div class="container">
            <div class="form-container">
                <slot />
            </div>

            <div class="actions">
                <app-button
                    @click="closeDialog"
                    label="Отменить"
                    icon="pi pi-times"
                    severity="contrast"
                    :type="EButtonType.BUTTON"
                    text />
                <app-button
                    @click="$emit('submit')"
                    label="Сохранить"
                    icon="pi pi-check"
                    severity="success"
                    :type="EButtonType.BUTTON" />
            </div>
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import Dialog from 'primevue/dialog';
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import { ref, watch } from 'vue';
import { EButtonType } from '@/shared/components/blocks/form/types';

type Props = {
    header: string
}
type Emits = {
    (event: 'hide'): void
    (event: 'submit'): void
}

const visible = defineModel<boolean>('visible', { required: true });

defineProps<Props>()
const emit = defineEmits<Emits>();

const themeOverrides = ref({
    header: {
        padding: '1.5rem 1.5rem 0',
    },
});

watch(visible, value => {
    if (!value) {
        emit('hide');
    }
});

function closeDialog (): void {
    visible.value = false;
}
</script>

<style scoped>
.container {
    padding-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    align-items: center;
}

.form-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (min-width: 550px) {
    :global(.data-record-dialog) {
        width: 100%;
        max-width: 500px;
    }
}
</style>
