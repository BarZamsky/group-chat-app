const {User} = require('../models/User');
const logger = require('./logger');
const errorCodes = require('../utils/ErrorCodes');
const {createErrorResponse} = require('../utils/ServerResponse');

module.exports = async (req, res, next) => {
    const token = req.headers["x-auth"];
    if (!token)
        return res.status(401)
            .json(createErrorResponse(errorCodes.UNAUTHORIZED,'Unauthorized, access denied'));

    const response = await User.findByToken(token);
    if(response.errorCode === errorCodes.INVALID_TOKEN) {
        logger.debug('Invalid token, '+ response.message);
        res.status(401)
            .json(createErrorResponse(errorCodes.INVALID_TOKEN, response.message));
    } else if (response.errorCode === errorCodes.USER_NOT_FOUND){
        logger.log('error', 'user not found for token '+token);
        return res.status(401)
            .json(createErrorResponse(errorCodes.USER_NOT_FOUND, 'user not found'));
    }

    req.user = response.data;
    req.token = token;
    next();
};

