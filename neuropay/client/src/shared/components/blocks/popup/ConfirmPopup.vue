<template>
    <ConfirmPopup>
        <template #container="{ message, acceptCallback, rejectCallback }">
            <div class="container">
                <div class="content">
                    <i class="pi pi-exclamation-triangle" />
                    <div>{{ message.message }}</div>
                </div>

                <div class="footer">
                    <app-button
                        @click="rejectCallback"
                        label="Отменить"
                        severity="contrast"
                        size="small"
                        :type="EButtonType.BUTTON"
                        text />
                    <app-button
                        @click="acceptCallback"
                        label="Продолжить"
                        severity="primary"
                        size="small"
                        :type="EButtonType.BUTTON" />
                </div>
            </div>
        </template>
    </ConfirmPopup>
</template>

<script lang="ts" setup>
import ConfirmPopup from 'primevue/confirmpopup';
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import { EButtonType } from '@/shared/components/blocks/form/types';
</script>

<style scoped>
.container {
    font-size: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
}

.content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
}

.footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
}
</style>
