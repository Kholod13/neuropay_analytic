import { ApiService } from '@/shared/server-api/ApiService';
import ServerRoutes from '@/shared/server-api/routes';
import { EHttpMethod } from '@/shared/http/types';
import type { DashboardCard } from './types';
import serverClient from '@/shared/server-api/ServerClient';
import type { ActionResponse } from '@/shared/server-api/admin/types';
import type { DashboardToken } from '@/shared/server-api';

export class DashboardCardsAdminApi extends ApiService {
    async getAll (): Promise<DashboardCard[]> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_GET_DASHBOARD_CARDS, EHttpMethod.GET);
    }

    async deleteById (id: string): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_DELETE_DASHBOARD_CARD, EHttpMethod.DELETE, {
            body: { id },
        });
    }

    async deleteByTokenId (tokenId: DashboardToken['id']): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_DELETE_DASHBOARD_CARD, EHttpMethod.DELETE, {
            body: { token_id: tokenId },
        });
    }
}

export const dashboardCardsAdminApi = new DashboardCardsAdminApi(serverClient);
