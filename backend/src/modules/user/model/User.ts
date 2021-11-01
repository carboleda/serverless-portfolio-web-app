import { TweetDto } from './../../tweet/model/Tweet';
import { AttributeValue } from "@aws-sdk/client-dynamodb"

export type UserModel = { [key: string]: AttributeValue; }

export type UserDto = {
    twitterHandle: string | undefined,
    image: string | undefined,
    name: string | undefined,
    description: string | undefined,
    timelineUpdatedAt: number | undefined,
}

export type TwitterUserModel = {
    screen_name: string,
    profile_image_url_https: string | undefined,
    name: string | undefined,
    description: string | undefined,
}

export type UserProfileDto = {
    user: UserDto,
    tweets?: TweetDto[],
}