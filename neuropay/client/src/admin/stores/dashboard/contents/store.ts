import { defineStore, storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { EPiniaStore } from '@/stores/types';
import type { DynamicContent, DynamicContentData, DynamicContentKeyData } from './types';
import { dashboardContentsAdminApi, type DynamicContentKey } from '@/shared/server-api';
import { useServerApiHelper } from '@/admin/composables/server-api/helper';
import type { ServerApiActionResult } from '@/admin/composables/server-api/types';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import { useDashboardTokensStore } from '@/admin/stores';

export const useDashboardContentsStore = defineStore(EPiniaStore.ADMIN_DASHBOARD_CONTENTS, () => {
    const { tokensById } = storeToRefs(useDashboardTokensStore());
    const { loadTokens } = useDashboardTokensStore();

    const contents = ref<DynamicContent>({
        keys: [],
        defaults: [],
        tokens: [],
    });

    const contentKeys = computed(() => contents.value.keys);
    const defaultContents = computed(() => contents.value.defaults);
    const tokenContents = computed(() => contents.value.tokens);

    const contentKeyDescriptionsMap = computed<Record<DynamicContentKeyData['key'], DynamicContentKeyData['description']>>(() =>
        Object.fromEntries(contentKeys.value.map(data => [data.key, data.description])),
    );

    const { handleRawAction } = useServerApiHelper();

    async function loadContents (): Promise<void> {
        await loadTokens();

        const data = await dashboardContentsAdminApi.getAll();

        contents.value = {
            keys: data.keys,
            defaults: data.defaults.map(defaultContents => ({
                key: defaultContents.key,
                value: defaultContents.value ?? '',
            })),
            tokens: data.tokens.map(tokenContents => ({
                token: tokensById.value[tokenContents.token_id],
                key: tokenContents.key,
                value: tokenContents.value,
            })),
        };
    }

    async function updateContents (data: DynamicContentData, tokenId?: DashboardToken['id']): Promise<ServerApiActionResult> {
        return await handleRawAction(
            async () => dashboardContentsAdminApi.update(data, tokenId),
            loadContents,
        );
    }

    async function deleteContents (tokenId: DashboardToken['id'], key?: DynamicContentKey): Promise<ServerApiActionResult> {
        return await handleRawAction(
            async () => dashboardContentsAdminApi.delete(tokenId, key),
            loadContents,
        );
    }

    return {
        contents,

        contentKeys,
        defaultContents,
        tokenContents,
        contentKeyDescriptionsMap,

        loadContents,
        updateContents,
        deleteContents,
    };
});

export type DashboardContentsStoreDefinition = ReturnType<typeof useDashboardContentsStore>
