<template>
    <content-header v-bind="$props">
        <template #actions>
            <app-button
                @click="$emit('create')"
                label="Добавить"
                icon="pi pi-plus"
                severity="primary"
                :type="EButtonType.BUTTON"/>
        </template>
    </content-header>
</template>

<script setup lang="ts">
import ContentHeader, { type ContentHeaderProps } from '@/shared/components/layout/content/ContentHeader.vue';
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import { EButtonType } from '@/shared/components/blocks/form/types';

type Emits = {
    (event: 'create'): void
}

withDefaults(defineProps<ContentHeaderProps>(), {
    secondary: false,
});
defineEmits<Emits>();
</script>
