import { ApiService } from '@/shared/server-api/ApiService';
import serverClient from '@/shared/server-api/ServerClient';
import type { DashboardToken, DashboardTokenData } from './types';
import ServerRoutes from '@/shared/server-api/routes';
import { EHttpMethod } from '@/shared/http/types';
import type { ActionResponse } from '@/shared/server-api/admin/types';

export class DashboardTokensAdminApi extends ApiService {
    async getAll (): Promise<DashboardToken[]> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_GET_DASHBOARD_TOKENS, EHttpMethod.GET);
    }

    async create (data: DashboardTokenData): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_CREATE_DASHBOARD_TOKEN, EHttpMethod.POST, {
            body: data,
        });
    }

    async update (id: DashboardToken['id'], data: DashboardTokenData): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_UPDATE_DASHBOARD_TOKEN(id), EHttpMethod.PUT, {
            body: data,
        });
    }

    async delete (id: DashboardToken['id']): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_DELETE_DASHBOARD_TOKEN(id), EHttpMethod.DELETE);
    }
}

export const dashboardTokensAdminApi = new DashboardTokensAdminApi(serverClient);
