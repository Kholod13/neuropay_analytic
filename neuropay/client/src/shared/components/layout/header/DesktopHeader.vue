<template>
    <page-header @logout="$emit('logout')">
        <template #logo>
            <header-logo />
        </template>

        <template
            v-if="userLogin"
            #actions>
            <div>{{ userLogin }}</div>
        </template>
    </page-header>
</template>

<script lang="ts" setup>
import PageHeader from './PageHeader.vue';
import HeaderLogo from './HeaderLogo.vue';

type Props = {
    userLogin?: string
}
type Emits = {
    (event: 'logout'): void
}

defineProps<Props>();
defineEmits<Emits>();
</script>
