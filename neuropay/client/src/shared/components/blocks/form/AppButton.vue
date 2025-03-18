<template>
    <Button
        :type="internalType"
        :link="link"
        :text="text"
        :outlined="outlined"
        :loading="loading">
        <slot />
    </Button>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';
import { computed } from 'vue';
import { EButtonType } from './types';

type Props = {
    type?: EButtonType
    link?: boolean
    text?: boolean
    outlined?: boolean
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    link: false,
    text: false,
    outlined: false,
    loading: false,
});

const internalType = computed(() => props.type ?? (props.link ? EButtonType.BUTTON : EButtonType.SUBMIT));
</script>
