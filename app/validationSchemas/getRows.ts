const deleteRow = {
    body: null,
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

export default deleteRow;
