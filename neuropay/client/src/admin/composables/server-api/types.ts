import type { ActionResponse } from '@/shared/server-api/admin/types';

export enum EServerApiActionResultStatus {
    SUCCESS = 'success',
    ERROR = 'error'
}

export type ServerApiActionResult = {
    status: EServerApiActionResultStatus
    message: string
}

export type RawServerApiAction = () => Promise<ActionResponse>
export type ServerApiAction<T extends unknown[] = never[]> = (...args: T) => Promise<ServerApiActionResult>
