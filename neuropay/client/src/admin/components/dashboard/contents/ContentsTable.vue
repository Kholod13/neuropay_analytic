<template>
    <data-table
        @toggle-group="toggleGroup"
        v-model:expanded-row-groups="expandedRowGroups"
        :value="contents"
        :pt="{
            rowGroupHeaderCell: {
                colspan: '3',
            },
        }"
        group-rows-by="tokenId"
        row-group-mode="subheader"
        expandable-row-groups>
        <template #groupheader="slotProps">
            {{ slotProps.data.groupTitle }}
        </template>
        <template #groupHeaderActions="slotProps">
            <actions-column
                @add="add(slotProps.data.tokenId)"
                @remove="remove(slotProps.data.tokenId)"
                :can-edit="false"
                :can-add="!!slotProps.data.tokenId"
                :can-remove="!!slotProps.data.tokenId" />
        </template>

        <Column
            field="keyTitle"
            header="Описание" />

        <Column
            field="value"
            header="Контент">
            <template #body="slotProps">
                <div v-html="slotProps.data.value" />
            </template>
        </Column>

        <Column>
            <template #body="slotProps">
                <actions-column
                    @edit="edit(slotProps.data, slotProps.data.tokenId)"
                    @remove="remove(slotProps.data.tokenId, slotProps.data.key)"
                    :can-remove="!!slotProps.data.tokenId" />
            </template>
        </Column>
    </data-table>
</template>

<script lang="ts" setup>
import Column from 'primevue/column';
import DataTable from '@/admin/components/blocks/data/DataTable.vue';
import ActionsColumn from '@/admin/components/blocks/data/ActionsColumn.vue';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import type { DynamicContent, DynamicContentData } from '@/admin/stores/dashboard/contents/types';
import type { ContentDataRow, RemoveContentPayload, EditContentPayload, AddContentPayload } from './types';
import { useDashboardContentsStore } from '@/admin/stores';

const DEFAULT_GROUP_TITLE = 'По умолчанию';

type Props = {
    defaultContents: DynamicContent['defaults']
    tokenContents: DynamicContent['tokens']
}
type Emits = {
    (event: 'add', payload: AddContentPayload): void
    (event: 'edit', payload: EditContentPayload): void
    (event: 'remove', payload: RemoveContentPayload): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { contentKeyDescriptionsMap } = storeToRefs(useDashboardContentsStore());

const expandedRowGroups = ref<ContentDataRow['tokenId'][]>([undefined]);

const contents = computed((): ContentDataRow[] => [
    ...props.defaultContents.map(content => ({
        ...content,
        groupTitle: DEFAULT_GROUP_TITLE,
        keyTitle: contentKeyDescriptionsMap.value[content.key] ?? '',
    })),
    ...props.tokenContents.map(content => ({
        key: content.key,
        value: content.value,
        tokenId: content.token.id,
        groupTitle: content.token.token,
        keyTitle: contentKeyDescriptionsMap.value[content.key] ?? '',
    })),
]);

function add (tokenId?: ContentDataRow['tokenId']): void {
    emit('add', { tokenId });
}

function edit (data: DynamicContentData, tokenId?: ContentDataRow['tokenId']): void {
    emit('edit', {
        key: data.key,
        tokenId,
    });
}

function remove (tokenId?: ContentDataRow['tokenId'], key?: ContentDataRow['key']): void {
    if (!tokenId) {
        return;
    }

    emit('remove', { tokenId, key });
}

function toggleGroup (row: ContentDataRow): void {
    const index = expandedRowGroups.value.indexOf(row.tokenId);

    if (index === -1) {
        expandedRowGroups.value.push(row.tokenId);
    } else {
        expandedRowGroups.value.splice(index, 1);
    }
}
</script>
