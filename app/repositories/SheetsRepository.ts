import Logger from "@app/config/Logger";
import ISheet, { INestedColumn } from "@app/interfaces/models/ISheet";
import Sheet, { ISheetModel } from "@app/models/Sheet";
import { Types } from 'mongoose';
import BaseRepository from "./BaseRepository";

export default class SheetsRepository extends BaseRepository {

    public create = async (attrs: Partial<ISheet>): Promise<ISheetModel> => {
        try {
            return await Sheet.create(attrs);
        } catch (error) {
            Logger.debug('error occured');
            this.transformToRepositoryError(error);
        }
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
    ): Promise<number> => {

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

        return res.n;
    }

    public findColumns = (sheetId: Types.ObjectId): Promise<INestedColumn[]> => {
        return Sheet.aggregate([
            { $match: { _id: sheetId } },
            { $unwind: '$columns' },
            { $replaceRoot: { newRoot: '$columns' } },
            { $sort: {"order": 1} }
        ]).exec();
    }

    public deleteColumn = async (sheetId: Types.ObjectId, columnId: Types.ObjectId): Promise<number> => {
        const res = await Sheet.update(
            { _id: sheetId },
            { $pull: { columns: { _id: columnId } } }
        );

        return res.n;
    }

}
