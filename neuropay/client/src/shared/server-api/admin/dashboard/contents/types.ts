import type { DynamicContentKey } from '@/shared/server-api/dashboard/contents/types';
import type { DashboardToken } from '@/shared/server-api';

export type DynamicContentKeyData = {
    key: DynamicContentKey
    description: string
}

export type DynamicContentData<T extends string | null = string> = {
    key: DynamicContentKey
    value: T
}

export type TokenDynamicContentData = DynamicContentData & {
    token_id: DashboardToken['id']
}

export type DynamicContent = {
    keys: DynamicContentKeyData[]

    defaults: DynamicContentData<string | null>[]
    tokens: TokenDynamicContentData[]
}
