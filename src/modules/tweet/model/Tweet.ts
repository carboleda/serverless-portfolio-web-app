import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { TwitterUserModel } from "../../user/model/User";

export type TweetModel = { [key: string]: AttributeValue; }

export type TweetDto = {
    id: string | undefined,
    text: string | undefined,
    url: string | undefined,
    userName: string | undefined,
    userImage: string | undefined,
    twitterHandle: string | undefined,
}

export type TweetTwitterModel = {
    id_str: string,
    text: string | undefined,
    user: TwitterUserModel,
    entities: Entities,
    retweeted_status: TweetTwitterModel
}

type Entities = {
    urls: Url[]
}

type Url = {
    url: string,
    expanded_url: string
}