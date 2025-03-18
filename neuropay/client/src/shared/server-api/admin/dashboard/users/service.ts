import { ApiService } from '@/shared/server-api/ApiService';
import serverClient from '@/shared/server-api/ServerClient';
import type { DashboardUser, DashboardUserData } from './types';
import ServerRoutes from '@/shared/server-api/routes';
import { EHttpMethod } from '@/shared/http/types';
import type { DashboardToken } from '@/shared/server-api';
import type { ActionResponse } from '@/shared/server-api/admin/types';

export class DashboardUsersAdminApi extends ApiService {
    async getAll (): Promise<DashboardUser[]> {
        return this.client.sendRequest(ServerRoutes.ADMIN_GET_DASHBOARD_USERS, EHttpMethod.GET);
    }

    async create (tokenId: DashboardToken['id'], data: DashboardUserData): Promise<ActionResponse> {
        return this.client.sendRequest(ServerRoutes.ADMIN_CREATE_DASHBOARD_USER, EHttpMethod.POST, {
            body: {
                token_id: tokenId,
                ...data,
            },
        });
    }

    async update (id: DashboardUser['id'], data: DashboardUserData): Promise<ActionResponse> {
        return this.client.sendRequest(ServerRoutes.ADMIN_UPDATE_DASHBOARD_USER(id), EHttpMethod.PUT, {
            body: data,
        });
    }

    async delete (id: DashboardUser['id']): Promise<ActionResponse> {
        return this.client.sendRequest(ServerRoutes.ADMIN_DELETE_DASHBOARD_USER(id), EHttpMethod.DELETE);
    }

    async deleteAll (tokenId: DashboardToken['id']): Promise<ActionResponse> {
        return this.client.sendRequest(ServerRoutes.ADMIN_DELETE_ALL_DASHBOARD_USERS, EHttpMethod.DELETE, {
            body: {
                token_id: tokenId,
            },
        });
    }
}

export const dashboardUsersAdminApi = new DashboardUsersAdminApi(serverClient);
