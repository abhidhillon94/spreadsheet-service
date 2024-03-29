import SheetConstants from '@app/constants/SheetConstants';
import { Schema } from 'mongoose';

const NestedColumn = new Schema({
    dataType: {
        type: String,
        enum: Object.values(SheetConstants.COLUMN_DATA_TYPES),
        default: SheetConstants.COLUMN_DATA_TYPES.TEXT,
    },
    value: String,
}, {
    _id: true,
});

export default NestedColumn;
