import * as Express from 'express';

export default abstract class AbstractRoute {
    constructor(protected prefix: string, protected server: Express.Application) {
    }

    public getPrefix(): string {
        return `/api/${this.prefix}`;
    }

    abstract register(): Express.Router;
}
