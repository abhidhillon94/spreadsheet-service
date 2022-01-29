import SheetConstants from "@app/constants/SheetConstants";

const postSheet = {
    body: {
        type: 'object',
        required: ['sheet'],
        properties: {
            sheet: {
                type: 'object',
                properties: {
                    columns: {
                        type: 'array',
                        items: {
                            type: 'object',
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
                },
                additionalProperties: false,
            },
        },
        additionalProperties: false,
    },
    query: null,
    params: null,
};

export default postSheet;
