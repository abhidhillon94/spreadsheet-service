export default class RepositoryError extends Error {

    constructor(public code: string, public message: string) {
        super(message);
        this.name = 'RepositoryError';
    }
}
