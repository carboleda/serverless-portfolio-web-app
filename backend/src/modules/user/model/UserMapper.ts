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

    /**
     * The '_normal' section is removed from the image url in order to access the original variant
     * See more https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/user-profile-images-and-banners
     */
    static twitter2Dto(model: TwitterUserModel): UserDto {
        const image = model.profile_image_url_https;
        return {
            twitterHandle: model.screen_name,
            image: image ? image.replace('_normal', '') : image,
            name: model.name,
            description: model.description,
        }
    }
}