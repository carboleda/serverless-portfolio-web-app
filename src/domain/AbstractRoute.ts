import * as Express from 'express';
import LoadEnv from '../helpers/LoadEnv';

export default abstract class AbstractRoute {
    constructor(protected prefix: string, protected server: Express.Application) {
    }

    public getPrefix(): string {
        return `/api/${this.prefix}`;
    }

    abstract register(): Express.Router;
}
