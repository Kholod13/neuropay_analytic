import type { DynamicContentKey } from '@/shared/server-api/dashboard/contents/types';
import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';

export type DynamicContentKeyData = {
    key: DynamicContentKey
    description: string
}

export type DynamicContentData = {
    key: DynamicContentKey
    value: string
}

export type TokenDynamicContentData = DynamicContentData & {
    token: DashboardToken
}

export type DynamicContent = {
    keys: DynamicContentKeyData[]

    defaults: DynamicContentData[]
    tokens: TokenDynamicContentData[]
}
