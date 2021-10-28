import { IRestClient, Endpoint, Methods } from './Client';
import axios from 'axios';

export default class AxiosRequestClient implements IRestClient {

    public async request(endpoint: Endpoint, payload: any): Promise<any> {
        endpoint = this.normalizeEndpoint(endpoint, payload);
        const response = await axios(endpoint);
        const { status, statusText, data } = response;
        return { status, statusText, data };
    }

    private normalizeEndpoint(endpoint: Endpoint, payload: any): Endpoint {
        if (endpoint.method === Methods.POST || endpoint.method === Methods.PUT) {
            endpoint.data = payload;
        } else {
            endpoint.url = this.template(endpoint.url, payload);
        }

        return endpoint;
    }

    private template(uri: string, params: any): string {
        const keys = Object.keys(params);
        keys.forEach((key: string) => {
            uri = uri.replace(`{${key}}`, params[key]);
        });

        return uri;
    }
}
