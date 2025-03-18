import { ApiService } from '@/shared/server-api/ApiService';
import ServerRoutes from '@/shared/server-api/routes';
import { EHttpMethod } from '@/shared/http/types';
import type { DynamicContent, DynamicContentData } from './types';
import serverClient from '@/shared/server-api/ServerClient';
import type { DashboardToken, DynamicContentKey } from '@/shared/server-api';
import type { ActionResponse } from '@/shared/server-api/admin/types';

export class DashboardContentsAdminApi extends ApiService {
    async getAll (): Promise<DynamicContent> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_GET_DASHBOARD_CONTENTS, EHttpMethod.GET);
    }

    async update (data: DynamicContentData, token_id?: DashboardToken['id']): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_UPDATE_DASHBOARD_CONTENTS, EHttpMethod.POST, {
            body: {
                ...data,
                ...(token_id ? { token_id } : {}),
            },
        });
    }

    async delete (token_id: DashboardToken['id'], key?: DynamicContentKey): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_DELETE_DASHBOARD_CONTENTS, EHttpMethod.DELETE, {
            body: {
                token_id,
                ...(key ? { key } : {}),
            },
        });
    }
}

export const dashboardContentsAdminApi = new DashboardContentsAdminApi(serverClient);
