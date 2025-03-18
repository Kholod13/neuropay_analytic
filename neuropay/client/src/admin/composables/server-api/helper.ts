import { EServerApiActionResultStatus, type RawServerApiAction, type ServerApiActionResult, } from './types';
import { ServerApiActionResultStatusesMap } from './constants';

export type UseServerApiHelperReturn = {
    handleRawAction (action: RawServerApiAction, onSuccess?: VoidFunction): Promise<ServerApiActionResult>
}

export function useServerApiHelper (): UseServerApiHelperReturn {
    async function handleRawAction (action: RawServerApiAction, onSuccess?: VoidFunction): Promise<ServerApiActionResult> {
        let result: ServerApiActionResult = {
            status: EServerApiActionResultStatus.ERROR,
            message: 'Не удалось выполнить действие',
        };

        try {
            const response = await action();
            result = {
                status: ServerApiActionResultStatusesMap[response.status],
                message: response.message,
            };

            if (result.status === EServerApiActionResultStatus.SUCCESS) {
                onSuccess?.();
            }
        } catch (error) {
            console.error(error);
        }

        return result;
    }

    return {
        handleRawAction,
    };
}
