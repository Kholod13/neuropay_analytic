<template>
    <page-layout
        @logout="logout"
        :nav-items="navItems"
        :user-login="user?.email">
        <slot />
    </page-layout>
</template>

<script setup lang="ts">
import PageLayout from '@/shared/components/layout/PageLayout.vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/dashboard/stores';
import { useApplicationStore } from '@/shared/stores';
import { userApi } from '@/shared/server-api';
import { ERouteName } from '@/router/types';
import { navItems } from '@/dashboard/components/layout/constants';

type Props = {
    secondary?: boolean
}

withDefaults(defineProps<Props>(), {
    secondary: false,
});

const { user } = storeToRefs(useUserStore());
const { wrapLoading } = useApplicationStore();

const router = useRouter();

async function logout (): Promise<void> {
    await wrapLoading(async () => {
        await userApi.logout();
        await router.push({ name: ERouteName.DASHBOARD_LOGIN });
    });
}
</script>
