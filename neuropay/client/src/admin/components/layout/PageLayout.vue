<template>
    <page-layout
        @logout="logout"
        :nav-items="navItems">
        <slot />
    </page-layout>
</template>

<script setup lang="ts">
import PageLayout from '@/shared/components/layout/PageLayout.vue';
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/shared/stores';
import { adminUserApi } from '@/shared/server-api';
import { ERouteName } from '@/router/types';
import { navItems } from '@/admin/components/layout/constants';

type Props = {
    secondary?: boolean
}

withDefaults(defineProps<Props>(), {
    secondary: false,
});

const { wrapLoading } = useApplicationStore();

const router = useRouter();

async function logout (): Promise<void> {
    await wrapLoading(async () => {
        await adminUserApi.logout();
        await router.push({ name: ERouteName.ADMIN_LOGIN });
    });
}
</script>
