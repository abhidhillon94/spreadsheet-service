import SheetConstants from "@app/constants/SheetConstants";

const postColumn = {
    body: {
        type: 'object',
        required: ['column'],
        properties: {
            column: {
                type: 'object',
                required: ['value', 'order'],
                properties: {
                    value: { type: 'string' },
                    dataType: {
                        type: 'string',
                        enum: Object.values(Object.values(SheetConstants.COLUMN_DATA_TYPES)),
                    },
                    order: { type: 'number' }
                },
                additionalProperties: false,
            },
            additionalProperties: false,
        },
        additionalProperties: false,
    },
    query: null,
    params: null,
};

export default postColumn;
