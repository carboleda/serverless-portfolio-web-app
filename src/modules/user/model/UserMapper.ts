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

    static toModel(dto: UserDto): UserModel {
        return {
            TWITTER_HANDLE: { S: dto.twitterHandle } as AttributeValue,
            IMAGE: { S: dto.image } as AttributeValue,
            NAME: { S: dto.name } as AttributeValue,
            DESCRIPTION: { S: dto.description } as AttributeValue,
        }
    }

    static twitter2Dto(model: TwitterUserModel): UserDto {
        return {
            twitterHandle: model.screen_name,
            image: model.profile_image_url_https,
            name: model.name,
            description: model.description,
        }
    }
}