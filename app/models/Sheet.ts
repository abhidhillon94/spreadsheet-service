import ISheet from '@app/interfaces/models/ISheet';
import { Document, Model, model, Schema, Types } from 'mongoose';
import NestedColumn from './schemas/NestedColumn';

export interface ISheetModel extends ISheet, Document {
    _id: Types.ObjectId;
}

const schema: Schema = new Schema({
    columns: {
        type: [NestedColumn],
        default: [],
    },
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    versionKey: false,
});

const Sheet: Model<ISheetModel> = model<ISheetModel>('Sheet', schema, 'sheets');
export default Sheet;
