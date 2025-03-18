import type { FetchContext, FetchResponse } from 'ofetch';

export enum EHttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum EResponseType {
    JSON = 'json',
}

export type FetchOptions<ResponseType extends EResponseType = EResponseType> = Partial<{
    baseURL: string
    responseType: ResponseType
    body: Record<string, unknown>
    query: Record<string, unknown>
    headers: Record<string, string>

    onResponseError: FetchResponseErrorHandler<ResponseType>
}>

export type FetchResponseErrorHandler<ResponseType extends EResponseType = EResponseType> = (
    context: ResponseFetchContext<ResponseType>,
) => Promise<void> | void

export type ResponseFetchContext<ResponseType extends EResponseType = EResponseType> = FetchContext<unknown, ResponseType> & {
    response: FetchResponse<unknown>;
}
