<template>
    <div>
        <app-button
            @click="toggleDark"
            :icon="icon"
            :type="EButtonType.BUTTON"
            outlined />
    </div>
</template>

<script lang="ts" setup>
import AppButton from '@/shared/components/blocks/form/AppButton.vue';
import { computed } from 'vue';
import { EButtonType } from '@/shared/components/blocks/form/types';
import { useThemeSwitcher } from '@/shared/components/theming/themeSwitcher';

const { isDark, toggleDark } = useThemeSwitcher();

const icon = computed(() => isDark.value ? 'pi pi-moon' : 'pi pi-sun');
</script>
