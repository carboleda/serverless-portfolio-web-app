import { Singleton } from 'typescript-ioc';
import { IRestClient, Endpoint } from './Client';

@Singleton
export default class Api {

    private client: IRestClient;

    constructor(client: IRestClient) {
        this.client = client;
    }

    public async request(endpoint: Endpoint, payload: any = {}): Promise<any> {
        return await this.client.request(endpoint, payload);
    }
}
