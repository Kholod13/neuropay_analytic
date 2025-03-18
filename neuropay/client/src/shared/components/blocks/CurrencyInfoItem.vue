<template>
    <info-item
        :label="label"
        :value="normalizedValueWithCurrency"
        value-class="currency-info-item-value" />
</template>

<script lang="ts" setup>
import InfoItem from './InfoItem.vue';
import { computed } from 'vue';

type Props = {
    label: string
    currency: string
    value?: number
}

const props = defineProps<Props>();

const normalizedValueWithCurrency = computed(() => `${getNormalizedValue()} ${props.currency}`.trim());

function getNormalizedValue (): string {
    return props.value?.toFixed(2) ?? '';
}
</script>

<style scoped>
:deep(.currency-info-item-value) {
    text-transform: uppercase;
}
</style>
