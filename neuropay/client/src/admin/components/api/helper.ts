import {
    EServerApiActionResultStatus,
    type ServerApiAction,
    type ServerApiActionResult,
} from '@/admin/composables/server-api/types';
import { useApplicationStore } from '@/shared/stores';
import { useToastMessage } from '@/shared/components/blocks/toast/message';
import { EMessageGroup, EMessageSeverity, type MessageOptions } from '@/shared/components/blocks/toast/types';

export type UseApiHelperReturn = {
    handleAction (action: ServerApiAction): Promise<void>
}

export function useApiHelper (): UseApiHelperReturn {
    const { wrapLoading } = useApplicationStore();

    const toastMessage = useToastMessage();

    async function handleAction (action: ServerApiAction): Promise<void> {
        await wrapLoading(async () => handleActionResult(await action()));
    }

    return {
        handleAction,
    };

    async function handleActionResult (result: ServerApiActionResult): Promise<void> {
        const messageOptions: MessageOptions = result.status === EServerApiActionResultStatus.SUCCESS
            ? {
                severity: EMessageSeverity.SUCCESS,
                summary: 'Успешно',
            }
            : {
                severity: EMessageSeverity.ERROR,
                summary: 'Ошибка',
            };

        await toastMessage.add({
            ...messageOptions,
            group: EMessageGroup.PRIMARY,
            detail: result.message
        });
    }
}
