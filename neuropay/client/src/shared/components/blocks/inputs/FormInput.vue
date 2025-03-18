<template>
    <div>
        <slot />

        <help-text
            v-if="invalid && !!errorText"
            :id="helpTextId"
            error>{{ errorText }}</help-text>
    </div>
</template>

<script lang="ts" setup>
import HelpText from './HelpText.vue';

type Props = {
    id: string
    label: string
    required: boolean
    invalid: boolean
    errorText: string | null
    helpTextId: string
}

defineProps<Props>();
</script>
