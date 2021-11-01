import '../../../src/IoC';
import { Container, ObjectFactory } from 'typescript-ioc';
import NotFoundError from '../../../src/domain/errors/NotFoundError';
import { UserDto } from '../../../src/modules/user/model/User';
import UserRepository from '../../../src/modules/user/repository/UserRepository';
import GetUserProfile from '../../../src/modules/user/use-case/GetUserProfile';
import TweetRepository from '../../../src/modules/tweet/repository/TweetRepository';
import { TweetDto } from '../../../src/modules/tweet/model/Tweet';

describe('Get user profile', () => {
    test('Fails when twitter handle does not exist', async () => {
        // Arrange
        const twitterHandle = 'does_not_exist';
        class UserRepositoryMock extends UserRepository {
            async getUserFromApi(twitterHandle: string): Promise<UserDto> {
                throw new NotFoundError();
            }
            async getUserFromDb(handle: string): Promise<UserDto | null> {
                return null;
            }
        }
        Container.bind(UserRepository).to(UserRepositoryMock);
        const useCase: GetUserProfile = Container.get(GetUserProfile);

        try {
            // Act
            await useCase.exec(twitterHandle);
        } catch (error) {
            // Assert
            expect(error).not.toBeNull();
        }
    });

    test('Users are saved to DB when them does not exist', async () => {
        // Arrange
        const twitterHandle = 'this_does_not_exist';
        class UserRepositoryMock extends UserRepository {
            async getUserFromApi(twitterHandle: string): Promise<UserDto> {
                return {
                    "twitterHandle": "cfarboleda",
                    "image": "",
                    "name": "Carlos F Arboleda",
                    "description": "Senior Software Engineer...",
                    "timelineUpdatedAt": Date.now(),
                };
            }
            async createUserOnDb(user: UserDto): Promise<UserDto> {
                return user;
            }
            async getUserFromDb(twitterHandle: string): Promise<UserDto | null> {
                return null;
            }
        }

        class TweetRepositoryMock extends TweetRepository {
            async getLastTweetsByUserFromApi(twitterHandle: string): Promise<TweetDto[]> {
                return [];
            }
            async saveTweetsToDb(tweets: TweetDto[]): Promise<TweetDto[]> {
                return tweets;
            }
            async getTweetsByUserFromDb(twitterHandle: string): Promise<TweetDto[]> {
                return [];
            }
        }

        const userRepoMock = new UserRepositoryMock();
        const repoFactory: ObjectFactory = () => userRepoMock;
        Container.bind(UserRepository).factory(repoFactory);
        Container.bind(TweetRepository).to(TweetRepositoryMock);

        const useCase: GetUserProfile = Container.get(GetUserProfile);
        const fnCreateUserOnDbMock = jest.fn(userRepoMock.createUserOnDb);
        userRepoMock.createUserOnDb = fnCreateUserOnDbMock;

        // Act
        await useCase.exec(twitterHandle);

        // Assert
        expect(fnCreateUserOnDbMock.mock.calls.length).toBe(1);
    });
});