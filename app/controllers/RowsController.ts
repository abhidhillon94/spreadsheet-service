import RowsService from "@app/services/RowsService";
import SheetsService from "@app/services/SheetsService";
import { Types } from 'mongoose';
import BaseController from "./BaseController";

export default class RowsController extends BaseController {

    constructor(private rowsService: RowsService, private sheetsService: SheetsService) {
        super();
    }

    public create = async (req, res, next): Promise<void> => {
        try {
            await this.sheetsService.validateSheetAndColumnExistence(
                Types.ObjectId(req.params.sheetId),
                req.body.row.cells ? Object.keys(req.body.row.cells).map((cell) => Types.ObjectId(cell)) : [],
            )
            const row = await this.rowsService.create({...req.body.row, sheetId: Types.ObjectId(req.params.sheetId)});
            return this.successResponse(res, {row});
        } catch (error) {
            next(error);
        }
    }

    public setCellValue = async (req, res, next): Promise<void> => {
        await this.rowsService.setCellValue(
            Types.ObjectId(req.params.sheetId),
            Types.ObjectId(req.params.rowId),
            req.body.cell,
        );
        return this.noContentResponse(res);
    }

    public patch = async (req, res, next): Promise<void> => {
        try {
            await this.sheetsService.validateSheetAndColumnExistence(
                Types.ObjectId(req.params.sheetId),
                req.body.row.cells ? Object.keys(req.body.row.cells).map((cell) => Types.ObjectId(cell)) : [],
            )
            await this.rowsService.updateAll(
                {sheetId: Types.ObjectId(req.params.sheetId), _id: Types.ObjectId(req.params.rowId)},
                req.body.row,
            );
            return this.noContentResponse(res);
        } catch (error) {
            next(error);
        }
    }

    public getAll = async (req, res, next): Promise<void> => {
        try {
            await this.sheetsService.validateSheetAndColumnExistence(
                Types.ObjectId(req.params.sheetId),
                [],
            )
            const rows = await this.rowsService.getAll({sheetId: Types.ObjectId(req.params.sheetId)});
            return this.successResponse(res, {rows});
        } catch (error) {
            next(error);
        }
    }

    public delete = async (req, res, next): Promise<void> => {
        try {
            await this.rowsService.deleteAll(
                {sheetId: Types.ObjectId(req.params.sheetId), _id: Types.ObjectId(req.params.rowId)}
            );
            return this.noContentResponse(res);
        } catch (error) {
            next(error)
        }
    }

}
