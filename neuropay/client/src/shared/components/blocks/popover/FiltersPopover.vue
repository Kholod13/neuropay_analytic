<template>
    <Popover ref="popover">
        <div class="container">
            <div class="content">
                <slot />
            </div>

            <div class="actions">
                <app-button
                    v-if="showReset"
                    @click="$emit('reset', controls.hide)"
                    label="Сбросить"
                    severity="contrast"
                    size="small"
                    :type="EButtonType.BUTTON"
                    text />
                <app-button
                    @click="$emit('apply', controls.hide)"
                    label="Применить"
                    severity="primary"
                    size="small"
                    :type="EButtonType.BUTTON"
                    :fluid="!showReset" />
            </div>
        </div>
    </Popover>

    <div
        v-if="$slots.toggle"
        @click="controls.toggle"
        class="toggle-controls">
        <slot name="toggle" />
    </div>
</template>

<script lang="ts" setup>
import Popover, { type PopoverMethods } from 'primevue/popover';
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import { ref } from 'vue';
import { usePopoverControls, type UsePopoverControlsReturn } from './popoverControls';
import { EButtonType } from '@/shared/components/blocks/form/types';

type Props = {
    showReset?: boolean
}
type Emits = {
    (event: 'apply', hide: UsePopoverControlsReturn['hide']): void
    (event: 'reset', hide: UsePopoverControlsReturn['hide']): void
}

withDefaults(defineProps<Props>(), {
    showReset: true,
});
defineEmits<Emits>();

const popover = ref<PopoverMethods | null>(null);

const controls = usePopoverControls(popover);

defineExpose(controls);
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: .5rem;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.actions {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
}
</style>
