const createResponse = (statusCode, data) => {
    return {
        errorCode: statusCode,
        data: data
    }
};

const createErrorResponse = (statusCode, errMessage) => {
    return {
        errorCode: statusCode,
        error: errMessage
    }
};

module.exports = { createResponse, createErrorResponse };
