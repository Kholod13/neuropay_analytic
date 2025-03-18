import type { DashboardToken } from '@/admin/stores/dashboard/tokens/types';

export type DashboardStatisticsData = {
    profit: number
    transactionsCount: number
}

export type TokenDashboardStatistics = DashboardStatisticsData & {
    token: DashboardToken
}

export type TotalDashboardStatistics = TokenDashboardStatistics
export type DailyDashboardStatistics = TokenDashboardStatistics & {
    date: Date
}

export type UpdateDashboardStatisticsData = DashboardStatisticsData & {
    date?: Date
}
