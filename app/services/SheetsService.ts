import Logger from "@app/config/Logger";
import ErrorCodes from "@app/constants/ErrorCodes";
import ErrorConstants from "@app/constants/ErrorConstants";
import ServiceError from "@app/errors/ServiceError";
import ISheet, { INestedColumn } from "@app/interfaces/models/ISheet";
import { ISheetModel } from "@app/models/Sheet";
import SheetsRepository from "@app/repositories/SheetsRepository";
import { Types } from 'mongoose';

export default class SheetsService {

    constructor(
        private sheetsRepository: SheetsRepository,
    ) { }

    public create = async (attrs: Partial<ISheet>): Promise<ISheetModel> => {
        return this.sheetsRepository.create(attrs);
    }

    public addColumn = async (sheetId: Types.ObjectId, attrs: INestedColumn): Promise<INestedColumn> => {
        const updatedSheet = await this.sheetsRepository.addColumn({_id: sheetId}, attrs);
        if (!updatedSheet) {
            throw new ServiceError(
                ErrorConstants.SERVICE_ERROR_CODES.NO_MATCH_FOUND_FOR_FILTERS,
                'Sheet not found for given id'
            );
        }
        return updatedSheet.columns[updatedSheet.columns.length - 1];
    }

    public updateColumn = async (sheetId: Types.ObjectId, columnId: Types.ObjectId, attrs: INestedColumn): Promise<void> => {
        const matchedDocuments = await this.sheetsRepository.updateColumn({_id: sheetId}, columnId, attrs);
        if (matchedDocuments === 0) {
            throw new ServiceError(
                ErrorConstants.SERVICE_ERROR_CODES.NO_MATCH_FOUND_FOR_FILTERS,
                'Column not found for given sheetId and columnId'
            );
        }
    }

    public getColumns = async (sheetId: Types.ObjectId): Promise<INestedColumn[]> => {
        return this.sheetsRepository.findColumns(sheetId);
    }

    public deleteColumn = async (sheetId: Types.ObjectId, columnId: Types.ObjectId): Promise<void> => {
        const matchedDocuments = await this.sheetsRepository.deleteColumn(sheetId, columnId);
        if (matchedDocuments === 0) {
            throw new ServiceError(
                ErrorConstants.SERVICE_ERROR_CODES.NO_MATCH_FOUND_FOR_FILTERS,
                'Column not found for given sheetId and columnId'
            );
        }
    }

}
