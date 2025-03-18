import { ofetch } from 'ofetch';
import { omit } from 'lodash-es';
import qs from 'qs';
import { type EHttpMethod, EResponseType, type FetchOptions } from './types';
import { isValue } from '@/shared/utils/typeUtils';

export class HttpClient {
    private readonly fetch: typeof ofetch;
    protected defaultOptions: FetchOptions = {};

    constructor (fetch: typeof ofetch) {
        this.fetch = fetch;
    }

    setDefaultOptions (options: FetchOptions): void {
        this.defaultOptions = options;
    }

    addDefaultOptions (options: FetchOptions): void {
        this.defaultOptions = { ...this.defaultOptions, ...options };
    }

    async sendRequest<Response> (
        route: string,
        method: EHttpMethod,
        options: FetchOptions = {},
    ): Promise<Response> {
        let request = route;
        const optionsWithDefaults = { ...this.defaultOptions, ...options };

        const query = optionsWithDefaults.query;
        if (isValue(query)) {
            request += `?${qs.stringify(query, { arrayFormat: 'brackets' })}`;
        }

        return await this.fetch(request, {
            method,
            ...omit(optionsWithDefaults, 'query'),
        });
    }
}
