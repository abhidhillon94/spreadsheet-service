import SheetsService from "@app/services/SheetsService";
import { Types } from 'mongoose';
import BaseController from "./BaseController";

export default class SheetsController extends BaseController {

    private sheetsService: SheetsService;

    constructor(sheetsService: SheetsService) {
        super();
        this.sheetsService = sheetsService;
    }

    public create = async (req, res, next): Promise<void> => {
        try {
            const sheet = await this.sheetsService.create(req.body.sheet);
            return this.successResponse(res, {sheet});
        } catch (error) {
            next(error);
        }
    }

    public createColumn = async (req, res, next): Promise<void> => {
        try {
            const column = await this.sheetsService.addColumn(req.params.sheetId, req.body.column);
            return this.successResponse(res, {column});
        } catch (error) {
            next(error);
        }
    }

    public patchColumn = async (req, res, next): Promise<void> => {
        try {
            const column = await this.sheetsService.updateColumn(
                req.params.sheetId, req.params.columnId, req.body.column,
            );
            return this.successResponse(res, {column});
        } catch (error) {
            next(error);
        }
    }

    public getAll = async (req, res, next): Promise<void> => {
        const columns = await this.sheetsService.getColumns(Types.ObjectId(req.params.sheetId));
        return res.status(200).send({columns});
    }

    public deleteColumn = async (req, res, next): Promise<void> => {
        try {
            await this.sheetsService.deleteColumn(Types.ObjectId(req.params.sheetId), Types.ObjectId(req.params.columnId));
            return this.noContentResponse(res);
        } catch (error) {
            next(error);
        }
    }

}
