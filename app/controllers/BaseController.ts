import ErrorConstants from '@app/constants/ErrorConstants';
import { Response } from 'express';

export default class BaseController {

    protected readonly SUCCESS = 200;
    protected readonly NO_CONTENT = 204;
    protected readonly BAD_REQUEST = 400;
    protected readonly UNAUTHORIZED = 401;
    protected readonly UNPROCESSABLE_ENTITY = 422;
    protected readonly INTERNAL_SERVER_ERROR = 500;
    protected readonly CONFLICT = 409;
    protected readonly NOT_FOUND = 404;
    protected readonly FORBIDDEN = 403;
    protected readonly EXPECTATION_FAILED = 417;

    protected successResponse = (res: Response, data: any) => {
        res.status(this.SUCCESS).send(data);
    }

    protected noContentResponse = (res: Response) => {
        res.status(this.NO_CONTENT).send();
    }

    protected notFoundResponse = (res: Response, data) => {
        res.status(this.NOT_FOUND).send({error: data});
    }

    protected unprocessableEntityResponse = (res: Response, data: any) => {
        res.status(this.UNPROCESSABLE_ENTITY).send({error: data});
    }

    protected conflictResponse = (res: Response, data: any) => {
        res.status(this.CONFLICT).send({error: data});
    }

    protected internalServerErrorResponse = (res: Response, message: string) => {
        res.status(this.INTERNAL_SERVER_ERROR).send({error: {
            code: ErrorConstants.RESPONSE_ERROR_CODES.INTERNAL_SERVER_ERROR,
            message,
        }});
    }
}
