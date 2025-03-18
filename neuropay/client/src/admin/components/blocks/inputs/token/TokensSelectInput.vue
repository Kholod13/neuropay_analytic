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
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';

type Props = {
    id: string
    tokens: DashboardToken[]
    label?: string
    required?: boolean
    filter?: boolean
}

const modelValue = defineModel<DashboardToken['id'] | null>();

const props = withDefaults(defineProps<Props>(), {
    label: 'Токен',
    required: false,
    filter: true,
});

const options = computed(() =>
    props.tokens.map(token => ({
        label: token.token,
        value: token.id,
    })),
);
</script>
