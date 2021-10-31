export default class LoadEnv {
    public static readonly NODE_ENV: string = process.env.NODE_ENV!!;
    public static readonly IS_OFFLINE: Boolean = JSON.parse(process.env.IS_OFFLINE || 'false');

    public static readonly PORT: number = parseInt(process.env.PORT || '3000');
    public static readonly TWITTER_ENDPOINT: string = process.env.TWITTER_ENDPOINT!!;
    public static readonly LIMIT_TWEETS: number = parseInt(process.env.LIMIT_TWEETS!!);
    public static readonly TWITTER_BEARER_TOKEN: string = process.env.TWITTER_BEARER_TOKEN!!;

    public static readonly USERS_TABLE: string = process.env.USERS_TABLE!!;
    public static readonly TWEETS_TABLE: string = process.env.TWEETS_TABLE!!;

}