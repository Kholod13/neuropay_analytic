import { ApiService } from '@/shared/server-api/ApiService';
import serverClient from '@/shared/server-api/ServerClient';
import type { DashboardBank, UpdateDashboardBankData } from './types';
import ServerRoutes from '@/shared/server-api/routes';
import { EHttpMethod } from '@/shared/http/types';
import type { ActionResponse } from '@/shared/server-api/admin/types';
import type { DashboardToken } from '@/shared/server-api';

export class DashboardBanksAdminApi extends ApiService {
    async getAll (): Promise<DashboardBank[]> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_GET_DASHBOARD_BANKS, EHttpMethod.GET);
    }

    async create (tokenId: DashboardToken['id'] | null, data: UpdateDashboardBankData): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_CREATE_DASHBOARD_BANK, EHttpMethod.POST, {
            body: {
                ...(tokenId ? { token_id: tokenId } : {}),
                name: data.name,
                sort_order: data.sort_order,
            },
        });
    }

    async update (id: DashboardBank['id'], data: UpdateDashboardBankData): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_UPDATE_DASHBOARD_BANK(id), EHttpMethod.PUT, {
            body: {
                name: data.name,
                sort_order: data.sort_order,
            },
        });
    }

    async delete (id: DashboardBank['id']): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_DELETE_DASHBOARD_BANK(id), EHttpMethod.DELETE);
    }

    async deleteAll (tokenId: DashboardToken['id']): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_DELETE_ALL_DASHBOARD_BANKS, EHttpMethod.DELETE, {
            body: {
                token_id: tokenId,
            },
        });
    }
}

export const dashboardBanksAdminApi = new DashboardBanksAdminApi(serverClient);
