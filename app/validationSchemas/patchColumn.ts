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
                    order: { type: 'number' },
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
            additionalProperties: false,
        },
        additionalProperties: false,
    },
    query: null,
    params: null,
};

export default patchColumn;
