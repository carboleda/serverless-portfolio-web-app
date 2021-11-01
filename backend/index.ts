import * as serverless from 'serverless-http';
import Server from './src/Server';

module.exports.handler = serverless(new Server().init());