export default abstract class Respository<D, A> {
    constructor(protected db: D, protected api: A) {}
}
