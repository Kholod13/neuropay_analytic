import { ApiService } from '@/shared/server-api/ApiService';
import type { DashboardStatistics, UpdateDashboardStatisticsData } from './types';
import ServerRoutes from '@/shared/server-api/routes';
import { EHttpMethod } from '@/shared/http/types';
import type { ActionResponse } from '@/shared/server-api/admin/types';
import type { DateRange } from '@/shared/types';
import { getDateString } from '@/shared/utils/dateUtils';
import serverClient from '@/shared/server-api/ServerClient';

export class DashboardStatisticsAdminApiService extends ApiService {
    async getStatisticsByDate (dateRange: DateRange): Promise<DashboardStatistics[]> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_GET_DASHBOARD_STATISTICS, EHttpMethod.GET, {
            query: {
                from_date: getDateString(dateRange.from),
                to_date: getDateString(dateRange.to),
            },
        });
    }

    async updateStatistics (tokenId: DashboardStatistics['token_id'], data: UpdateDashboardStatisticsData): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_UPDATE_DASHBOARD_STATISTICS, EHttpMethod.POST, {
            body: {
                token_id: tokenId,
                profit: data.profit,
                transactions_count: data.transactions_count,
                ...(data.date ? { date: getDateString(data.date) } : {}),
            },
        });
    }

    async deleteTotalStatistics (tokenId: DashboardStatistics['token_id']): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_DELETE_DASHBOARD_STATISTICS, EHttpMethod.DELETE, {
            body: {
                token_id: tokenId,
            },
        });
    }

    async deleteDailyStatistics (tokenId: DashboardStatistics['token_id'], dateRange: DateRange): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_DELETE_DASHBOARD_STATISTICS, EHttpMethod.DELETE, {
            body: {
                token_id: tokenId,
                date_range: {
                    from: getDateString(dateRange.from),
                    to: getDateString(dateRange.to),
                },
            },
        });
    }
}

export const dashboardStatisticsAdminApi = new DashboardStatisticsAdminApiService(serverClient);
