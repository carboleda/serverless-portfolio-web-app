import ApiError from "./ApiError";

export default class NotFoundError extends ApiError {
    constructor(cause: Error | null = null) {
        super("Not found", 404, cause);
    }
}
