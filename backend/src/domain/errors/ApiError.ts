export default class ApiError extends Error {
    public code: number = 500;
    public cause: Error | null = null;

    constructor(message: string, code: number, cause: Error | null = null) {
        super(message);
        this.code = code;
        this.cause = cause;
    }
}
