import Logger from "@app/config/Logger";
import IRow, { INestedCells } from "@app/interfaces/models/IRow";
import Row, { IRowModel } from "@app/models/Row";
import { Types } from 'mongoose';
import BaseRepository from "./BaseRepository";

export default class RowsRepository extends BaseRepository {

    public create = async (attrs: Partial<IRow>): Promise<IRowModel> => {
        try {
            return await Row.create(attrs);
        } catch (error) {
            this.transformToRepositoryError(error);
        }
    }

    public findAll = async (attrs: Partial<IRow>): Promise<IRowModel[]> => {
        return Row.find(attrs).sort({order: 1});
    }

    public setCellValue = async (
        sheetId: Types.ObjectId, rowId: Types.ObjectId, cellValues: INestedCells,
    ): Promise<IRowModel> => {

        const columnValueUpdates = {};
        for (const [key, value] of Object.entries(cellValues)) {
            columnValueUpdates[`cells.${key}`] = value;
        }

        return Row.findOneAndUpdate({
            _id: rowId,
            sheetId,
        }, {
            $set: columnValueUpdates,
        }, {new: true}).exec();
    }

    public updateAll = async (findAttrs: Partial<IRow>, updateAttrs: Partial<IRow>): Promise<number> => {
        try {
            const res = await Row.updateMany(findAttrs, updateAttrs);
            return res.n;
        } catch (error) {
            this.transformToRepositoryError(error);
        }
    }

    public deleteAll = async (findAttrs: Partial<IRow>): Promise<number> => {
        const res = await Row.deleteMany(findAttrs);
        return res.n;
    }

}
