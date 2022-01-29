import RowsService from "@app/services/RowsService";
import { Types } from 'mongoose';

export default class RowsController {

    constructor(private rowsService: RowsService) {}

    public create = async (req, res, next): Promise<void> => {
        const row = await this.rowsService.create({...req.body.row, sheetId: req.params.sheetId});
        return res.status(200).send({row});
    }

    public setCellValue = async (req, res, next): Promise<void> => {
        await this.rowsService.setCellValue(
            Types.ObjectId(req.params.sheetId),
            Types.ObjectId(req.params.rowId),
            req.body.cell,
        );
        return res.status(204).send();
    }

    public patch = async (req, res, next): Promise<void> => {
        const row = await this.rowsService.updateAll(
            {sheetId: Types.ObjectId(req.params.sheetId), _id: Types.ObjectId(req.params.rowId)},
            req.body.row,
        );
        return res.status(204).send({row});
    }

    public getAll = async (req, res, next): Promise<void> => {
        const rows = await this.rowsService.getAll({sheetId: Types.ObjectId(req.params.sheetId)});
        return res.status(200).send({rows});
    }

    public delete = async (req, res, next): Promise<void> => {
        await this.rowsService.deleteAll(
            {sheetId: Types.ObjectId(req.params.sheetId), _id: Types.ObjectId(req.params.rowId)}
        );
        return res.status(204).send({});
    }

}
