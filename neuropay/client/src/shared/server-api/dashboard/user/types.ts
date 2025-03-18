import type { Numeric } from '@/shared/server-api/types';

export enum ELoginStatus {
    SUCCESS = 'success',
    ERROR = 'error',
}

export type LoginResponse = {
    status: ELoginStatus
    message?: string
}

export type User = {
    email: string
    wallet_address: string
    security_deposit: Numeric
    working_deposit: Numeric
    frozen_deposit: Numeric
    rate: Numeric
    currency: string
}
