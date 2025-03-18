<template>
    <select-input
        v-model="modelValue"
        :id="id"
        :label="label"
        :options="options"
        option-label="label"
        option-value="value"
        :required="required"
        :filter="filter" />
</template>

<script setup lang="ts">
import SelectInput from '@/shared/components/blocks/inputs/select/SelectInput.vue';
import { computed } from 'vue';
import type { Wallet } from '@/admin/stores/wallets/types';

type Props = {
    id: string
    wallets: Wallet[]
    label?: string
    required?: boolean
    filter?: boolean
}

const modelValue = defineModel<Wallet['id'] | null>();

const props = withDefaults(defineProps<Props>(), {
    label: 'Кошелек',
    required: false,
    filter: false,
});

const options = computed(() =>
    props.wallets.map(wallet => ({
        label: wallet.address,
        value: wallet.id,
    })),
);
</script>
