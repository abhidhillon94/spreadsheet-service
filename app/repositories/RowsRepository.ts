import IRow, { INestedCells } from "@app/interfaces/models/IRow";
import Row, { IRowModel } from "@app/models/Row";
import { Types } from 'mongoose';

export default class RowsRepository {

    public create = async (attrs: Partial<IRow>): Promise<IRowModel> => {
        return Row.create(attrs);
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

    public updateAll = async (findAttrs: Partial<IRow>, updateAttrs: Partial<IRow>): Promise<IRowModel> => {
        return Row.update(findAttrs, updateAttrs);
    }

    public deleteAll = async (findAttrs: Partial<IRow>): Promise<IRowModel> => {
        return Row.deleteMany(findAttrs);
    }

}
