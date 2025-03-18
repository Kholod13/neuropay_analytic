<template>
    <page-header @logout="$emit('logout')">
        <template #logo>
            <div class="logo-wrapper">
                <i
                    @click="$emit('toggle-menu')"
                    class="pi pi-bars menu-toggle-icon" />

                <header-logo />
            </div>
        </template>

        <template
            v-if="userLogin"
            #actions>
            <div class="user-login">{{ userLogin }}</div>
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
    (event: 'toggle-menu'): void
    (event: 'logout'): void
}

defineProps<Props>();
defineEmits<Emits>();
</script>

<style scoped>
.logo-wrapper {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

.menu-toggle-icon {
    cursor: pointer;
    font-size: 2rem;
    color: var(--p-primary-hover-color);
}

@media (width <= 768px) {
    .user-login {
        display: none;
    }
}
</style>
