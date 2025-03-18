import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';

export type TokenStatisticsRow = {
    date?: Date
    profit?: number
    transactionsCount?: number
}

export type AddStatisticsPayload = {
    tokenId: DashboardToken['id']
    daily: boolean
}

export type EditStatisticsPayload = {
    tokenId: DashboardToken['id']
    date?: Date
}

export type RemoveStatisticsPayload = {
    tokenId: DashboardToken['id']
    date?: Date
}
