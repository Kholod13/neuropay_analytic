import { defineStore } from 'pinia';
import { ref } from 'vue';
import { EPiniaStore } from '@/stores/types';
import { contentsApi } from '@/shared/server-api';

export const useContentsStore = defineStore(EPiniaStore.DASHBOARD_CONTENTS, () => {
    const platformInstruction = ref('');
    const contactInformation = ref('');
    const payOutOrdersAreUnavailableErrorMessage = ref('');
    const payInOrdersAreUnavailableErrorMessage = ref('');

    async function loadContents (): Promise<void> {
        const contents = await contentsApi.getAll();

        platformInstruction.value = contents.platform_instruction ?? '';
        contactInformation.value = contents.contact_information ?? '';
        payOutOrdersAreUnavailableErrorMessage.value = contents.pay_out_orders_are_unavailable_error_message ?? '';
        payInOrdersAreUnavailableErrorMessage.value = contents.pay_in_orders_are_unavailable_error_message ?? '';
    }

    return {
        platformInstruction,
        contactInformation,
        payOutOrdersAreUnavailableErrorMessage,
        payInOrdersAreUnavailableErrorMessage,

        loadContents,
    };
});

export type ContentsStoreDefinition = ReturnType<typeof useContentsStore>;
