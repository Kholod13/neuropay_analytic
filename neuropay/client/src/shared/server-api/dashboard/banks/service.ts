import type { DashboardBank } from './types';
import { ApiService } from '@/shared/server-api/ApiService';
import ServerRoutes from '@/shared/server-api/routes';
import { EHttpMethod } from '@/shared/http/types';
import serverClient from '@/shared/server-api/ServerClient';

export class BanksApi extends ApiService {
    async getAll (): Promise<DashboardBank[]> {
        return await this.client.sendRequest(ServerRoutes.DASHBOARD_GET_BANKS, EHttpMethod.GET);
    }
}

export const banksApi = new BanksApi(serverClient);
