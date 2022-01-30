export default class ErrorConstants {

    public static readonly NAME_MONGO_ERROR = 'MongoError';

    public static readonly MONGO_ERROR_CODES = {
        DUPLICATE_KEY: 11000,
    }

    public static readonly REPOSITORY_ERROR_CODES = {
        UNIQUE_CONSTRAINT_VIOLATION: 'UNIQUE_CONSTRAINT_VIOLATION',
        UNHANDLED: 'UNHANDLED',
    }

    public static readonly RESPONSE_ERROR_CODES = {
        INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
    }
    
    public static readonly SERVICE_ERROR_CODES = {
        NO_MATCH_FOUND_FOR_FILTERS: 'NO_MATCH_FOUND_FOR_FILTERS',
    }
}
