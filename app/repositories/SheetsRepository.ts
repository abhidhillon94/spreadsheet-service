import Logger from "@app/config/Logger";
import ISheet, { INestedColumn } from "@app/interfaces/models/ISheet";
import Sheet, { ISheetModel } from "@app/models/Sheet";
import { Types } from 'mongoose';

export default class SheetsRepository {

    public create = async (attrs: Partial<ISheet>): Promise<ISheetModel> => {
        return Sheet.create(attrs);
    }

    public addColumn = async (findAttrs: Partial<ISheet>, columnAttrs: Partial<INestedColumn>): Promise<ISheetModel> => {
        return Sheet.findOneAndUpdate({
            ...findAttrs
        }, {
            $push: {
                columns: columnAttrs,
            },
        }, {new: true}).exec();
    }

    public updateColumn = async (
        findAttrs: Partial<ISheet>,
        columnId: Types.ObjectId,
        columnAttrs: Partial<INestedColumn>,
    ): Promise<void> => {

        const columnAttrsToUpdate = {};
        Object.keys(columnAttrs).map((columnAttrKey) => {
            columnAttrsToUpdate[`columns.$.${columnAttrKey}`] = columnAttrs[columnAttrKey];
        });

        const res = await Sheet.update({
            ...findAttrs,
            'columns._id': columnId,
        }, {
            $set: columnAttrsToUpdate,
        }).exec();

        Logger.debug({res});
    }

    public findColumns = (sheetId: Types.ObjectId): Promise<INestedColumn[]> => {
        return Sheet.aggregate([
            { $match: { _id: sheetId } },
            { $unwind: '$columns' },
            { $replaceRoot: { newRoot: '$columns' } },
            { $sort: {"order": 1} }
        ]).exec();
    }

    public deleteColumn = (sheetId: Types.ObjectId, columnId: Types.ObjectId) => {
        return Sheet.update(
            { _id: sheetId },
            { $pull: { columns: { _id: columnId } } }
        );
    }

}
