import { IRestClient, Endpoint } from './Client';

export default class Api {

    private client: IRestClient;

    constructor(client: IRestClient) {
        this.client = client;
    }

    public async request(endpoint: Endpoint, payload: any = {}): Promise<any> {
        return await this.client.request(endpoint, payload);
    }
}
