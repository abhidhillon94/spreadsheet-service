import SheetConstants from "@app/constants/SheetConstants";

const patchColumn = {
    body: {
        type: 'object',
        required: ['column'],
        properties: {
            column: {
                type: 'object',
                properties: {
                    value: { type: 'string' },
                    dataType: {
                        type: 'string',
                        enum: Object.values(Object.values(SheetConstants.COLUMN_DATA_TYPES)),
                    },
                    additionalProperties: false,
                },
                anyOf: [
                    {
                        required: ['value'],
                    },
                    {
                        required: ['dataType'],
                    },
                ],
            },
        },
        additionalProperties: false,
    },
    query: null,
    params: {
        type: 'object',
        required: ['sheetId', 'columnId'],
        properties: {
            sheetId: {
                type: 'string',
                format: 'object-id',
            },
            columnId: {
                type: 'string',
                format: 'object-id',
            },
        },
        additionalProperties: false,
    },
};

export default patchColumn;
