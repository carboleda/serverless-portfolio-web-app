import { AttributeValue } from "@aws-sdk/client-dynamodb"

export type UserModel = { [key: string]: AttributeValue; }

export type UserDto = {
    twitterHandle: string | undefined,
    image: string | undefined,
    name: string | undefined,
    description: string | undefined,
}