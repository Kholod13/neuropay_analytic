import type { AdminSigninResponse, AdminUser } from './types';
import { ApiService } from '@/shared/server-api/ApiService';
import ServerRoutes from '@/shared/server-api/routes';
import { EHttpMethod } from '@/shared/http/types';
import serverClient from '@/shared/server-api/ServerClient';

export class AdminUserApi extends ApiService {
    async signin (login: string, password: string): Promise<AdminSigninResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_SIGNIN, EHttpMethod.POST, {
            body: { login, password },
        });
    }

    async logout (): Promise<void> {
        await this.client.sendRequest(ServerRoutes.ADMIN_LOGOUT, EHttpMethod.POST);
    }

    async getCurrentUser (): Promise<AdminUser | null> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_GET_CURRENT_USER, EHttpMethod.GET);
    }
}

export const adminUserApi = new AdminUserApi(serverClient);
