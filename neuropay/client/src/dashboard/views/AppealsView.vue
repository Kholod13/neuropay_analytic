<template>
    <page-layout>
        <content-container>
            <content-header
                title="Диспуты"
                icon="pi pi-comments" />

            <appeals-tabs-bar v-model="activeTabId" />

            <content-body secondary>
                <div v-if="activeTabId === EAppealsTabId.ACTIVE">У вас нет активных апелляций.</div>
                <div v-else>У вас нет архивных апелляций.</div>
            </content-body>
        </content-container>
    </page-layout>
</template>

<script lang="ts" setup>
import PageLayout from '@/dashboard/components/layout/PageLayout.vue';
import ContentContainer from '@/shared/components/layout/content/ContentContainer.vue';
import ContentHeader from '@/shared/components/layout/content/ContentHeader.vue';
import ContentBody from '@/shared/components/layout/content/ContentBody.vue';
import AppealsTabsBar from '@/dashboard/components/appeals/AppealsTabsBar.vue';
import { ref } from 'vue';
import { useViewHelper } from '@/shared/components/views/viewHelper';
import { EAppealsTabId } from '@/dashboard/components/appeals/types';

const activeTabId = ref(EAppealsTabId.ACTIVE);

useViewHelper();
</script>
