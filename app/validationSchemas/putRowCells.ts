const putRowCells = {
    body: {
        type: 'object',
        required: ['cell'],
        properties: {
            cell: {
                type: 'object',
            },
        },
        additionalProperties: false,
    },
    query: null,
    params: null,
};

export default putRowCells;
