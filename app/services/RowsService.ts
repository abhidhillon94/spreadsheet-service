import IRow, { INestedCells } from "@app/interfaces/models/IRow";
import { IRowModel } from "@app/models/Row";
import RowsRepository from "@app/repositories/RowsRepository";
import { Types } from 'mongoose';

export default class RowsService {

    constructor(private rowsRepository: RowsRepository) {}

    public create = async (attrs: Partial<IRow>): Promise<IRowModel> => {
        return this.rowsRepository.create(attrs);
    }

    public getAll = async (attrs: Partial<IRow>): Promise<IRowModel[]> => {
        return this.rowsRepository.findAll(attrs);
    }

    public setCellValue = async (sheetId: Types.ObjectId, rowId: Types.ObjectId, cell: INestedCells): Promise<void> => {
        await this.rowsRepository.setCellValue(sheetId, rowId, cell);
    }

    public updateAll = async (findAttrs: Partial<IRow>, updateAttrs: Partial<IRow>): Promise<IRowModel> => {
        return this.rowsRepository.updateAll(findAttrs, updateAttrs);
    }

    public deleteAll = async (findAttrs: Partial<IRow>): Promise<void> => {
        await this.rowsRepository.deleteAll(findAttrs);
    }

}
