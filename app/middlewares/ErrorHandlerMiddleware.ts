import Logger from "@app/config/Logger";
import CommonConstants from "@app/constants/CommonConstants";
import ErrorConstants from "@app/constants/ErrorConstants";
import BaseController from "@app/controllers/BaseController";

class ErrorHandlerMiddleware extends BaseController {

    public handleError = async (err, req, res, next) => {

        if (err.name === 'ServiceError') {
            return this.unprocessableEntityResponse(res, {code: err.code, message: err.message});
        } else if (err.name === 'RepositoryError') {
            if ( [ErrorConstants.REPOSITORY_ERROR_CODES.UNIQUE_CONSTRAINT_VIOLATION].includes(err.code) ) {
                return this.conflictResponse(res, {code: err.code, message: err.message});
            }
        }

        if (process.env.NODE_ENV !== CommonConstants.ENVIRONMENTS.PROD) {
            return this.internalServerErrorResponse(res, err.stack);
        } else {
            Logger.debug({'unhandledApiError': err.stack});
            return this.internalServerErrorResponse(res, '');
        }
    }

}

export default ErrorHandlerMiddleware;
