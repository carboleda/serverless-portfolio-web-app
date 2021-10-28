import * as Express from 'express';
import { promisify } from 'util';
import { glob } from 'glob';
import * as Path from 'path';
import AbstractRoute from './domain/AbstractRoute';

export default class Router {
    public static async loadRoutes(server: Express.Application): Promise<any> {
        try {
            console.info('Router - Start adding routes');
            const globPromise = promisify(glob);
            const files: Array<string> = await globPromise('modules/*/routes/*.+(js|ts)', { cwd: __dirname });

            console.info(`Router - Found ${files.length} routes`);
            await Promise.all(files.map(async (filePath: string) => {
                const fullPath = Path.join(__dirname, filePath);
                const RouteClass = await require(fullPath).default;
                const abstractRoute: AbstractRoute = new RouteClass(server);

                console.info(`  - ${Path.relative('./', fullPath)} mounted on ${abstractRoute.getPrefix()}`);

                server.use(abstractRoute.getPrefix(), abstractRoute.register());
            }));

            console.info('Router - Finish adding routes');
        } catch (error) {
            console.error('Router - Error loading route files', error);
        }
    }
}
