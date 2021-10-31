import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { TweetDto, TweetModel, TweetTwitterModel } from './Tweet';

export default class UserMapper {
    static toDto(model: TweetModel): TweetDto {
        return {
            id: model.ID ? model.ID.S : undefined,
            text: model.TEXT ? model.TEXT.S : undefined,
            url: model.URL ? model.URL.S : undefined,
            userName: model.USER_NAME ? model.USER_NAME.S : undefined,
            userImage: model.USER_IMAGE ? model.USER_IMAGE.S : undefined,
            twitterHandle: model.TWITTER_HANDLE ? model.TWITTER_HANDLE.S : undefined,
        }
    }

    static toModel(dto: TweetDto): TweetModel {
        return {
            ID: { S: dto.id } as AttributeValue,
            TEXT: { S: dto.text } as AttributeValue,
            URL: { S: dto.url } as AttributeValue,
            USER_NAME: { S: dto.userName } as AttributeValue,
            USER_IMAGE: { S: dto.userImage } as AttributeValue,
            TWITTER_HANDLE: { S: dto.twitterHandle } as AttributeValue,
        }
    }

    static twitter2Dto(model: TweetTwitterModel): TweetDto {
        const getPartial = (tweet: TweetTwitterModel): any => ({
            url: tweet.entities.urls[0].url,
            userName: tweet.user.name,
            userImage: tweet.user.profile_image_url_https
        })

        return {
            id: model.id_str,
            text: model.text,
            ...getPartial(model.retweeted_status ? model.retweeted_status : model),
            twitterHandle: model.user.screen_name,
        }
    }
}