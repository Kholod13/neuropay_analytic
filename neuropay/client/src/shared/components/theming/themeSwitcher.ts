import { useDark, useToggle } from '@vueuse/core';
import type { Ref } from 'vue';
import { DARK_MODE_CLASS } from '@/themes/constants';

export type UseThemeSwitcherReturn = {
    isDark: Readonly<Ref<boolean>>
    toggleDark (): void
}

export function useThemeSwitcher (): UseThemeSwitcherReturn {
    const isDark = useDark({
        valueDark: DARK_MODE_CLASS,
    });
    const internalToggleDark = useToggle(isDark);

    function toggleDark (): void {
        internalToggleDark();
    }

    return {
        isDark,
        toggleDark,
    };
}
