import { AttributeValue } from '@aws-sdk/client-dynamodb';
import { UserDto, UserModel, TwitterUserModel } from './User';

export default class UserMapper {
    static toDto(model: UserModel): UserDto {
        return {
            twitterHandle: model.TWITTER_HANDLE.S,
            image: model.IMAGE ? model.IMAGE.S : undefined,
            name: model.NAME ? model.NAME.S : undefined,
            description: model.DESCRIPTION ? model.DESCRIPTION.S : undefined,
        }
    }

    static toModel(user: UserDto): UserModel {
        return {
            TWITTER_HANDLE: { S: user.twitterHandle } as AttributeValue,
            IMAGE: { S: user.image } as AttributeValue,
            NAME: { S: user.name } as AttributeValue,
            DESCRIPTION: { S: user.description } as AttributeValue,
        }
    }

    static twitter2Dto(user: TwitterUserModel): UserDto {
        return {
            twitterHandle: user.screen_name,
            image: user.profile_image_url_https,
            name: user.name,
            description: user.description,
        }
    }
}