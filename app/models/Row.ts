import IRow from '@app/interfaces/models/IRow';
import { Document, Model, model, Schema, Types } from 'mongoose';

export interface IRowModel extends IRow, Document {
    _id: Types.ObjectId;
}

const schema: Schema = new Schema({
    cells: {
        type: Object,
        default: {},
        required: true,
    },
    sheetId: Types.ObjectId,
    order: Number,
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    versionKey: false,
});

const Row: Model<IRowModel> = model<IRowModel>('Row', schema, 'rows');
export default Row;
