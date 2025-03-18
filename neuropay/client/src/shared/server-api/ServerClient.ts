import { ofetch } from 'ofetch';
import serverEventBus from './eventBus';
import { HttpClient } from '@/shared/http/Client';
import { EResponseType, type ResponseFetchContext } from '@/shared/http/types';

export class ServerClient extends HttpClient {
    constructor (fetch: typeof ofetch) {
        super(fetch);

        this.addDefaultOptions({
            responseType: EResponseType.JSON,
            headers: {
                'Content-Type': 'application/json',
            },
            onResponseError: context => this.onResponseError(context),
        });
    }

    private onResponseError ({ response }: ResponseFetchContext): void {
        if (response.status === 401) {
            serverEventBus.emit('unauthenticated');
        }
    }
}

export default new ServerClient(ofetch);
