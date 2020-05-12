const {User} = require('../models/User');
const logger = require('./logger');
const statusCode = require('../utils/statusCodes');
const {createErrorResponse} = require('../utils/ServerResponse');

module.exports = async (req, res, next) => {
    const token = req.headers["x-auth"];
    if (!token)
        return res.status(401)
            .json(createErrorResponse(statusCode.UNAUTHORIZED,'Unauthorized, access denied'));

    const response = await User.findByToken(token);
    if(response.status_code === statusCode.INVALID_TOKEN) {
        logger.debug('Invalid token, '+ response.message);
        res.status(401)
            .json(createErrorResponse(statusCode.INVALID_TOKEN, response.message));
    } else if (response.st === statusCode.USER_NOT_FOUND){
        logger.log('error', 'user not found for token '+token);
        return res.status(401)
            .json(createErrorResponse(statusCode.USER_NOT_FOUND, 'user not found'));
    }

    req.user = response.data;
    req.token = token;
    next();
};

