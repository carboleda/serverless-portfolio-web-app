import { Methods } from "../../../datasource/rest-api/Client";
import Api from "../../../datasource/rest-api/Api";
import Respository from "../../../domain/Repository";
import LoadEnv from "../../../helpers/LoadEnv";

export default class GetUserFromTwitter extends Respository<Api> {
    private static URL: string = `${LoadEnv.TWITTER_ENDPOINT}/1.1/users/show.json`;

    async exec(
        accessToken: string, tokenType: string, twitterHandle: string
    ): Promise<any> {
        try {
            const response = await this.dataSource.request({
                url: GetUserFromTwitter.URL,
                method: Methods.GET,
                headers: {
                    Authorization: `${tokenType} ${accessToken}`
                }
            }, { screen_name: twitterHandle });

            return response.data;
        } catch(error) {
            throw error;
        }
    }
}
