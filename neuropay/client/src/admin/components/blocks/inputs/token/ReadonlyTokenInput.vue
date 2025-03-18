<template>
    <div class="readonly-token-input">
        <div>{{ label }}</div>
        <div class="break-all">{{ token?.token ?? '' }}</div>
    </div>
</template>

<script setup lang="ts">
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';

type Props = {
    token: DashboardToken | null | undefined
    label?: string
}
withDefaults(defineProps<Props>(), {
    label: 'Токен',
});
</script>

<style scoped>
.readonly-token-input {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    margin-bottom: 1rem;
}
</style>
