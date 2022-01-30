const deleteColumn = {
    body: null,
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

export default deleteColumn;
