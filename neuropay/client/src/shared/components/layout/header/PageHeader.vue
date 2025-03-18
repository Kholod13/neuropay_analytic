<template>
    <header
        :style="headerStyle"
        class="header">
        <div
            :style="containerStyle"
            class="container">
            <slot name="logo" />

            <div class="header-actions">
                <slot name="actions" />

                <theme-toggle />
                <app-button
                    @click="$emit('logout')"
                    icon="pi pi-sign-out"
                    :type="EButtonType.BUTTON" />
            </div>
        </div>
    </header>
</template>

<script lang="ts" setup>
import ThemeToggle from '@/shared/components/theming/ThemeToggle.vue';
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import { PAGE_HEADER_CONTENT_HEIGHT_PX, PAGE_HEADER_PADDING_PX, PAGE_HEADER_BORDER_BOTTOM_WIDTH_PX } from '../constants';
import { EButtonType } from '@/shared/components/blocks/form/types';
import { px } from '@/shared/utils/styleUtils';

type Emits = {
    (event: 'logout'): void
}

defineEmits<Emits>();

const headerStyle = {
    padding: px(PAGE_HEADER_PADDING_PX),
    'border-bottom-width': px(PAGE_HEADER_BORDER_BOTTOM_WIDTH_PX),
};

const containerStyle = {
    height: px(PAGE_HEADER_CONTENT_HEIGHT_PX),
};
</script>

<style scoped>
.header {
    background-color: var(--p-content-secondary-background);
    backdrop-filter: blur(8px);
    border-bottom-style: solid;
    border-bottom-color: var(--p-content-secondary-border-color);
}

.container {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-left: auto;
}
</style>
