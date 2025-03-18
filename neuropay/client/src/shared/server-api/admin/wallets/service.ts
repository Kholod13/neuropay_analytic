import { ApiService } from '@/shared/server-api/ApiService';
import serverClient from '@/shared/server-api/ServerClient';
import type { Wallet, WalletData } from './types';
import ServerRoutes from '@/shared/server-api/routes';
import { EHttpMethod } from '@/shared/http/types';
import type { ActionResponse } from '@/shared/server-api/admin/types';

export class WalletsAdminApi extends ApiService {
    async getAll (): Promise<Wallet[]> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_GET_WALLETS, EHttpMethod.GET);
    }

    async create (wallet: WalletData): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_CREATE_WALLET, EHttpMethod.POST, {
            body: wallet,
        });
    }

    async update (id: Wallet['id'], wallet: WalletData): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_UPDATE_WALLET(id), EHttpMethod.PUT, {
            body: wallet,
        });
    }

    async delete (id: Wallet['id']): Promise<ActionResponse> {
        return await this.client.sendRequest(ServerRoutes.ADMIN_DELETE_WALLET(id), EHttpMethod.DELETE);
    }
}

export const walletsAdminApi = new WalletsAdminApi(serverClient);
