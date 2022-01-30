import SheetConstants from "@app/constants/SheetConstants";

const postColumn = {
    body: {
        type: 'object',
        required: ['column'],
        properties: {
            column: {
                type: 'object',
                required: ['value'],
                properties: {
                    value: { type: 'string' },
                    dataType: {
                        type: 'string',
                        enum: Object.values(Object.values(SheetConstants.COLUMN_DATA_TYPES)),
                    },
                },
                additionalProperties: false,
            },
        },
        additionalProperties: false,
    },
    query: null,
    params: {
        type: 'object',
        required: ['sheetId'],
        properties: {
            sheetId: {
                type: 'string',
                format: 'object-id',
            },
        },
        additionalProperties: false,
    },
};

export default postColumn;
