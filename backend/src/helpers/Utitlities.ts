export default class Utilities {
    public static isPortFree(port: number): Promise<Boolean> {
        return new Promise(resolve => {
            const server = require('http')
                .createServer()
                .listen(port, () => {
                    server.close()
                    resolve(true);
                })
                .on('error', () => {
                    resolve(false);
                })
        });
    }
}