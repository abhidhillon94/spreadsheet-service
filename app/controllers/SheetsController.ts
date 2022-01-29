import SheetsService from "@app/services/SheetsService";
import { Types } from 'mongoose';

export default class SheetsController {

    private sheetsService: SheetsService;

    constructor(sheetsService: SheetsService) {
        this.sheetsService = sheetsService;
    }

    public create = async (req, res, next): Promise<void> => {
        const sheet = await this.sheetsService.create(req.body.sheet);
        return res.status(200).send({sheet});
    }

    public createColumn = async (req, res, next): Promise<void> => {
        const column = await this.sheetsService.addColumn(req.params.sheetId, req.body.column);
        return res.status(200).send({column});
    }

    public patchColumn = async (req, res, next): Promise<void> => {
        const column = await this.sheetsService.updateColumn(
            req.params.sheetId, req.params.columnId, req.body.column,
        );
        return res.status(204).send({column});
    }

    public getAll = async (req, res, next): Promise<void> => {
        const columns = await this.sheetsService.getColumns(Types.ObjectId(req.params.sheetId));
        return res.status(200).send({columns});
    }

    public deleteColumn = async (req, res, next): Promise<void> => {
        await this.sheetsService.deleteColumn(Types.ObjectId(req.params.sheetId), Types.ObjectId(req.params.columnId));
        return res.status(204).send({});
    }

}
