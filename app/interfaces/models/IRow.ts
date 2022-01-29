import { Types } from 'mongoose';

export interface INestedCells {
    [columnId: string] : {
        value: string
    }
}

export default interface IRow {
    readonly _id?: Types.ObjectId;
    sheetId: Types.ObjectId;
    cells?: INestedCells;
    order: number;
}
