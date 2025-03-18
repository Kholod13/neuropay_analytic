import type { DashboardCard, DashboardCardData } from './types';
import { ApiService } from '@/shared/server-api/ApiService';
import ServerRoutes from '@/shared/server-api/routes';
import { EHttpMethod } from '@/shared/http/types';
import serverClient from '@/shared/server-api/ServerClient';

export class CardsApi extends ApiService {
    async getAll (): Promise<DashboardCard[]> {
        return await this.client.sendRequest(ServerRoutes.DASHBOARD_GET_CARDS, EHttpMethod.GET);
    }

    async create (card: Partial<DashboardCardData>): Promise<void> {
        await this.client.sendRequest(ServerRoutes.DASHBOARD_CREATE_CARD, EHttpMethod.POST, {
            body: card,
        });
    }

    async update (id: DashboardCard['id'], card: Partial<DashboardCardData>): Promise<void> {
        await this.client.sendRequest(ServerRoutes.DASHBOARD_UPDATE_CARD(id), EHttpMethod.PUT, {
            body: card,
        });
    }

    async remove (cardId: DashboardCard['id']): Promise<void> {
        await this.client.sendRequest(ServerRoutes.DASHBOARD_DELETE_CARD(cardId), EHttpMethod.DELETE);
    }
}

export const cardsApi = new CardsApi(serverClient);
