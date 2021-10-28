type Paging = {
    DEFAULT_LIMIT: number;
    MAX_LIMIT?: number;
    DEFAULT_OFFSET: number;
};

type Populate = {
    CONCURRENCY: number;
    DELAY: number;
};

export default class Constants {

    public static MY_API_PAGING: Paging = {
        DEFAULT_LIMIT: 20,
        DEFAULT_OFFSET: 0
    };
    public static SPOTIFY_API_PAGING: Paging = {
        DEFAULT_LIMIT: 20,
        MAX_LIMIT: 50,
        DEFAULT_OFFSET: 0
    };
    public static POPULATE_ALBUMS: Populate = {
        CONCURRENCY: 5,
        DELAY: 1000
    };
    public static POPULATE_SONGS: Populate = {
        CONCURRENCY: 10,
        DELAY: 3000
    };
}

export enum Environment {
    DEV = 'dev'
};
