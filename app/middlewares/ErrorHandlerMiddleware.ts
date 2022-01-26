export class ErrorHandlerMiddleware {

    public handleError = async (err, req, res, next) => {

        if (err.name === 'ServiceError') {
            res.status(422).send({error: err.code, message: err.message});
        } else {
            res.status(500).send({error: 'INTERNAL_SERVER_ERROR', message: err.stack});
        }
    }

}

export default ErrorHandlerMiddleware;
