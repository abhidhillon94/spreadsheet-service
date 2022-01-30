import Logger from "@app/config/Logger";
import ErrorConstants from "@app/constants/ErrorConstants";
import RepositoryError from "@app/errors/RepositoryError";

export default class BaseRepository {

    public transformToRepositoryError = (error: Error & {code: number}): never => {
        if (error.name === ErrorConstants.NAME_MONGO_ERROR && error.code === ErrorConstants.MONGO_ERROR_CODES.DUPLICATE_KEY) {
            Logger.debug('throwing UNIQUE_CONSTRAINT_VIOLATION');
            throw new RepositoryError(
                ErrorConstants.REPOSITORY_ERROR_CODES.UNIQUE_CONSTRAINT_VIOLATION,
                error.message,
            );
        } else {
            Logger.debug('throwing UNHANDLED');
            throw new RepositoryError(
                ErrorConstants.REPOSITORY_ERROR_CODES.UNHANDLED,
                error.message,
            );
        }
    }
}
