import type { KPI, Statistics } from './types';
import { ApiService } from '@/shared/server-api/ApiService';
import ServerRoutes from '@/shared/server-api/routes';
import { EHttpMethod } from '@/shared/http/types';
import { getDateString } from '@/shared/utils/dateUtils';
import serverClient from '@/shared/server-api/ServerClient';

export class StatisticsApi extends ApiService {
    async getByDateRange (fromDate: Date, toDate: Date): Promise<Statistics[]> {
        return await this.client.sendRequest(ServerRoutes.DASHBOARD_GET_KPI_STATISTICS, EHttpMethod.GET, {
            query: {
                from_date: getDateString(fromDate),
                to_date: getDateString(toDate),
            },
        });
    }

    async getTotals (): Promise<KPI> {
        return await this.client.sendRequest(ServerRoutes.DASHBOARD_GET_KPI_TOTALS, EHttpMethod.GET);
    }
}

export const statisticsApi = new StatisticsApi(serverClient);
