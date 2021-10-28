import * as DotEnv from 'dotenv';

DotEnv.config({ path: `${process.cwd()}/.env` });

export default class LoadEnv {
    public static readonly NODE_ENV: string = process.env.NODE_ENV!!;
    public static readonly PORT: number = parseInt(process.env.PORT || '8888');
    public static readonly DATABASE_CONNECTION_URI: string = process.env.DATABASE_CONNECTION_URI!!;
    public static readonly TWITTER_ENDPOINT: string = process.env.TWITTER_ENDPOINT!!;
    public static readonly TWITTER_CLIENT_ID: string = process.env.TWITTER_CLIENT_ID!!;
    public static readonly TWITTER_CLIENT_SECRET: string = process.env.TWITTER_CLIENT_SECRET!!;
}
