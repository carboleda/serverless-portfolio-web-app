import Respository from './Repository';

export default abstract class UseCase<D, A> {
    constructor(protected repository: Respository<D, A>) {}
}
