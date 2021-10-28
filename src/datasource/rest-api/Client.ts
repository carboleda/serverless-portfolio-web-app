export type Endpoint = {
    url: string,
    method: Methods,
    responseType?: any,
    headers?: any,
    data?: any
};

export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export interface IRestClient {
    request(endpoint: Endpoint, payload?: any): Promise<any>
}
