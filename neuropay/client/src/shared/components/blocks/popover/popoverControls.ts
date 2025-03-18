import type { PopoverMethods } from 'primevue/popover';
import type { Ref } from 'vue';

export type UsePopoverControlsReturn = {
    show (event: MouseEvent): void;
    hide (): void;
    toggle (event: MouseEvent): void;
}

export function usePopoverControls (popoverRef: Ref<PopoverMethods | null>): UsePopoverControlsReturn {
    function show (event: MouseEvent): void {
        popoverRef.value?.show(event);
    }

    function hide (): void {
        popoverRef.value?.hide();
    }

    function toggle (event: MouseEvent): void {
        popoverRef.value?.toggle(event);
    }

    return {
        show,
        hide,
        toggle
    };
}
