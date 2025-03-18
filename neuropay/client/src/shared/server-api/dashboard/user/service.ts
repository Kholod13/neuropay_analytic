import type { LoginResponse, User } from './types';
import { ApiService } from '@/shared/server-api/ApiService';
import ServerRoutes from '@/shared/server-api/routes';
import { EHttpMethod } from '@/shared/http/types';
import serverClient from '@/shared/server-api/ServerClient';

export class UserApi extends ApiService {
    async signup (token: string, email: string, password: string): Promise<LoginResponse> {
        return await this.client.sendRequest(ServerRoutes.DASHBOARD_SIGNUP, EHttpMethod.POST, {
            body: { token, email, password },
        });
    }

    async login (email: string, password: string): Promise<LoginResponse> {
        return await this.client.sendRequest(ServerRoutes.DASHBOARD_LOGIN, EHttpMethod.POST, {
            body: { email, password },
        });
    }

    async logout (): Promise<void> {
        await this.client.sendRequest(ServerRoutes.DASHBOARD_LOGOUT, EHttpMethod.POST);
    }

    async getCurrentUser (): Promise<User | null> {
        return await this.client.sendRequest(ServerRoutes.DASHBOARD_GET_CURRENT_USER, EHttpMethod.GET);
    }
}

export const userApi = new UserApi(serverClient);
