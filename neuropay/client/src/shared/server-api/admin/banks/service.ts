import { ApiService } from '@/shared/server-api/ApiService';
import serverClient from '@/shared/server-api/ServerClient';
import type { Bank } from './types';
import ServerRoutes from '@/shared/server-api/routes';
import { EHttpMethod } from '@/shared/http/types';

export class BanksAdminApi extends ApiService {
    async getAll (): Promise<Bank[]> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_GET_BANKS, EHttpMethod.GET);
    }
}

export const banksAdminApi = new BanksAdminApi(serverClient);
