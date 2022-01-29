import { Types } from 'mongoose';

export interface INestedColumn {
    readonly _id: Types.ObjectId;
    value: string | number;
    dataType: string;
    order: number;
}

export default interface ISheet {
    readonly _id?: Types.ObjectId;
    columns?: INestedColumn[];
}
