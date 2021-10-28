export default abstract class Respository<T> {
    constructor(protected dataSource: T) {}

    abstract exec<Result = any>(...args: any[]): Promise<Result>;
}
