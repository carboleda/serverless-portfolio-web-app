import Api from "../../../datasource/rest-api/Api";
import UseCase from "../../../domain/UseCase";
import Constants from "../../../helpers/Constants";

export default class GetUserProfile extends UseCase<Api> {
    async exec(accessToken: string, tokenType: string, albumId: string): Promise<Array<string>> {
        const limit = Constants.SPOTIFY_API_PAGING.MAX_LIMIT!!;
        let offset = Constants.SPOTIFY_API_PAGING.DEFAULT_OFFSET;
        let hasMore = false;
        let songs = Array<any>();

        do {
            const response = await this.repository.exec(
                accessToken, tokenType, albumId, limit, offset
            );

            songs = [...songs, ...response.items];

            offset += limit;
            hasMore = response.next !== null;
        } while (hasMore);

        return songs;
    }
}
