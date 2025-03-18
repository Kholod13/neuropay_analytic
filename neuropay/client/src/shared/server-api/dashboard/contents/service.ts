import { ApiService } from '@/shared/server-api/ApiService';
import ServerRoutes from '@/shared/server-api/routes';
import { EHttpMethod } from '@/shared/http/types';
import type { DynamicDashboardContent } from '@/shared/server-api/dashboard/contents/types';
import serverClient from '@/shared/server-api/ServerClient';

export class ContentsApi extends ApiService {
    async getAll (): Promise<DynamicDashboardContent> {
        return await this.client.sendRequest(ServerRoutes.DASHBOARD_GET_CONTENTS, EHttpMethod.GET);
    }
}

export const contentsApi = new ContentsApi(serverClient);
