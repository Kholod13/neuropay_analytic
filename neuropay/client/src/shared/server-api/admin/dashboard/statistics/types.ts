import type { DashboardToken } from '@/shared/server-api';
import type { Numeric } from '@/shared/server-api/types';

export type DashboardStatisticsData = {
    profit: Numeric
    transactions_count: Numeric
}

export type DashboardStatistics = DashboardStatisticsData & {
    token_id: DashboardToken['id']
    date?: string | null
}

export type UpdateDashboardStatisticsData = DashboardStatisticsData & {
    date?: Date
}
