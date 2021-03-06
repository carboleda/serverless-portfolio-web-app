import { Tweet } from "./tweet";

export type User = {
    twitterHandle: string,
    image: string,
    name: string,
    description: string,
    timelineUpdatedAt: number
}

export type UserProfile = {
    user: User,
    tweets: Tweet[],
}