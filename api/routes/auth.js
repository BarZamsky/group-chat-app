const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    {User} = require('../../models/User'),
    statusCodes = require('../../utils/StatusCodes'),
    serverResponse = require('../../utils/ServerResponse'),
    logger = require("../../middleware/logger");

router.post('/register', (req, res) => {
    passport.authenticate('local-signup', (err, user) => {
        if (err) {
            logger.log('error', err);
            res.send(serverResponse.createErrorResponse(statusCodes.GENERAL_ERROR, err))
        }
        if (!user) {
            logger.log('error', `${req.body.username} User name already exists`);
            res.send(serverResponse.createResponse(statusCodes.USER_ALREADY_EXISTS,"User name already exists"))
        }
        res.send(serverResponse.createResponse(0, user))
    })(req, res);
});

router.post('/login', (req, res) => {
    passport.authenticate('local-login', (err, user) => {
        if (err) {
            logger.log('error', err);
            res.send(serverResponse.createErrorResponse(statusCodes.GENERAL_ERROR, err))
        }
        res.send(serverResponse.createResponse(0, user))
    })(req, res);
});

module.exports = router;
