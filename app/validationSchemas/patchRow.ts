const deleteRow = {
    body: null,
    query: null,
    params: {
        type: 'object',
        required: ['sheetId', 'rowId'],
        properties: {
            sheetId: {
                type: 'string',
                format: 'object-id',
            },
            rowId: {
                type: 'string',
                format: 'object-id',
            },
        },
        additionalProperties: false,
    },
};

export default deleteRow;
