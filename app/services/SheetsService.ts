import ISheet, { INestedColumn } from "@app/interfaces/models/ISheet";
import { ISheetModel } from "@app/models/Sheet";
import SheetsRepository from "@app/repositories/SheetsRepository";
import { Types } from 'mongoose';

export default class SheetsService {

    constructor(
        private sheetsRepository: SheetsRepository,
    ) { }

    public create = async (attrs: Partial<ISheet>): Promise<ISheetModel> => {
        return this.sheetsRepository.create(attrs);
    }

    public addColumn = async (sheetId: Types.ObjectId, attrs: INestedColumn): Promise<INestedColumn> => {
        const updatedSheet = await this.sheetsRepository.addColumn({_id: sheetId}, attrs);
        return updatedSheet.columns[updatedSheet.columns.length - 1];
    }

    public updateColumn = async (sheetId: Types.ObjectId, columnId: Types.ObjectId, attrs: INestedColumn): Promise<void> => {
        await this.sheetsRepository.updateColumn({_id: sheetId}, columnId, attrs);
    }

    public getColumns = async (sheetId: Types.ObjectId): Promise<INestedColumn[]> => {
        return this.sheetsRepository.findColumns(sheetId);
    }

    public deleteColumn = async (sheetId: Types.ObjectId, columnId: Types.ObjectId) => {
        return this.sheetsRepository.deleteColumn(sheetId, columnId);
    }

}
