import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';
import type { DynamicContentKey } from '@/shared/server-api';

export type ContentDataRow = {
    groupTitle: string
    keyTitle: string
    key: DynamicContentKey
    value: string
    tokenId?: DashboardToken['id']
}

export type AddContentPayload = {
    tokenId?: DashboardToken['id']
}

export type EditContentPayload = {
    key: DynamicContentKey
    tokenId?: DashboardToken['id']
}

export type RemoveContentPayload = {
    tokenId: DashboardToken['id']
    key?: DynamicContentKey
}
