import SheetConstants from '@app/constants/SheetConstants';
import { Schema, Types } from 'mongoose';

const NestedColumn = new Schema({
    value: {
        type: String,
        enum: Object.values(SheetConstants.COLUMN_DATA_TYPES),
        default: SheetConstants.COLUMN_DATA_TYPES.TEXT,
    },
    dataType: String,
    order: Number,
}, {
    _id: true,
});

export default NestedColumn;
