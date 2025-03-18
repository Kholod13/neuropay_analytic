import { onMounted } from 'vue';
import { onBeforeRouteUpdate } from 'vue-router';
import { useApplicationStore } from '@/shared/stores';
import { wait } from '@/shared/utils/utils';
import { DEFAULT_MIN_LOADING_DURATION } from '@/shared/stores/application/constants';
import { useToastMessage } from '@/shared/components/blocks/toast/message';
import { EMessageGroup, EMessageSeverity } from '@/shared/components/blocks/toast/types';

export function useViewHelper (dataLoader?: () => Promise<unknown>): void {
    const { wrapLoading } = useApplicationStore();

    const toastMessage = useToastMessage();

    onBeforeRouteUpdate(load);
    onMounted(load);

    async function load (): Promise<void> {
        if (!dataLoader) {
            await wrapLoading(async () => await wait(DEFAULT_MIN_LOADING_DURATION));
            return;
        }

        try {
            await wrapLoading(dataLoader);
        } catch (error) {
            console.error(error);

            await toastMessage.add({
                group: EMessageGroup.PRIMARY,
                severity: EMessageSeverity.ERROR,
                summary: 'Ошибка',
                detail: 'Не удалось загрузить данные.',
            })
        }
    }
}
