import type { ServerClient } from './ServerClient';

export class ApiService {
    protected client: ServerClient;

    constructor (client: ServerClient) {
        this.client = client;
    }
}
