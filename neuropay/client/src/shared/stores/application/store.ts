import { defineStore } from 'pinia';
import { ref } from 'vue';
import { DEFAULT_MIN_LOADING_DURATION } from './constants';
import { EPiniaStore } from '@/stores/types';
import { wait } from '@/shared/utils/utils';

export const useApplicationStore = defineStore(EPiniaStore.APPLICATION, () => {
    const isLoading = ref(false);

    function setIsLoading (loading: boolean): void {
        isLoading.value = loading;
    }

    async function wrapLoading<T> (callback: () => T | Promise<T>, minDuration = DEFAULT_MIN_LOADING_DURATION): Promise<T> {
        try {
            setIsLoading(true);

            const [result] = await Promise.all([
                callback(),
                wait(minDuration),
            ]);

            return result;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        isLoading,

        setIsLoading,
        wrapLoading,
    };
});

export type ApplicationStoreDefinition = ReturnType<typeof useApplicationStore>;
