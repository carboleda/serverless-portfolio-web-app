import * as serverless from 'serverless-http';
import Server from './src/Server';

const server: Server = new Server();
server.start();

module.exports.handler = serverless(server.getApp());