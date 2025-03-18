import { EActionResultStatus } from '@/shared/server-api/admin/types';
import { EServerApiActionResultStatus } from './types';

export const ServerApiActionResultStatusesMap: Record<EActionResultStatus, EServerApiActionResultStatus> = {
    [EActionResultStatus.SUCCESS]: EServerApiActionResultStatus.SUCCESS,
    [EActionResultStatus.ERROR]: EServerApiActionResultStatus.ERROR,
};
