import Respository from './Repository';

export default abstract class UseCase<T> {
    constructor(protected repository: Respository<T>) {}

    abstract exec(...args: any[]): Promise<any>;
}
