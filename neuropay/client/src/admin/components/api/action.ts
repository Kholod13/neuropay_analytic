import { useApiHelper } from './helper';
import { EServerApiActionResultStatus, type ServerApiAction } from '@/admin/composables/server-api/types';

export function useApiAction<T extends unknown[]> (
    action: ServerApiAction<T>,
    onSuccess?: VoidFunction,
): (...args: T) => Promise<void> {
    const { handleAction } = useApiHelper();

    return async (...args: T) => handleAction(async () => {
        const result = await action(...args);

        if (result.status === EServerApiActionResultStatus.SUCCESS) {
            await onSuccess?.();
        }

        return result;
    });
}
