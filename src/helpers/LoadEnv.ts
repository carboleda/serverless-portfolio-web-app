import * as DotEnv from 'dotenv';

DotEnv.config({ path: `${process.cwd()}/.env` });

export default class LoadEnv {
    public static readonly NODE_ENV: string = process.env.NODE_ENV!!;
    public static readonly IS_OFFLINE: Boolean = JSON.parse(process.env.IS_OFFLINE!!);

    public static readonly PORT: number = parseInt(process.env.PORT || '3000');
    public static readonly DATABASE_CONNECTION_URI: string = process.env.DATABASE_CONNECTION_URI!!;
    public static readonly TWITTER_ENDPOINT: string = process.env.TWITTER_ENDPOINT!!;
    public static readonly TWITTER_BEARER_TOKEN: string = process.env.TWITTER_BEARER_TOKEN!!;

    public static readonly USERS_TABLE: string = process.env.USERS_TABLE!!;
}
