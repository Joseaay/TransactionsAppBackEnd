module.exports = {
    development: {
        port: 1234,
        api: {
            name: 'api',
            version: 'v1',
            responseTemplate: {
                status: 'ok',
                code: 200,
                messages: [],
                result: null
            }
        },
    }
};