import SheetConstants from '@app/constants/SheetConstants';
import { Schema, Types } from 'mongoose';

const NestedColumn = new Schema({
    dataType: {
        type: String,
        enum: Object.values(SheetConstants.COLUMN_DATA_TYPES),
        default: SheetConstants.COLUMN_DATA_TYPES.TEXT,
    },
    value: String,
    order: {
        type: Number,
        required: true,
    },
}, {
    _id: true,
});

export default NestedColumn;
