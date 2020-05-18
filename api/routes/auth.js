const express = require('express'),
    router = express.Router(),
    // passport = require('passport'),
    _ = require('lodash'),
    {User} = require('../../models/User'),
    statusCodes = require('../../utils/ErrorCodes'),
    {createErrorResponse, createResponse} = require('../../utils/ServerResponse'),
    logger = require("../../middleware/logger");

router.post('/register', async (req, res) => {
    try {
        const body = _.pick(req.body, ['username', 'password', 'displayName']);
        const user = new User(body);
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(createResponse(0, user));
    } catch (e) {
        logger.log('error', e.message);
        if (e.code === 11000)
            res.status(200).send(createResponse(statusCodes.GENERAL_ERROR, "Email already exists"));
        else
            res.status(400).send(createErrorResponse(statusCodes.GENERAL_ERROR, e.message));

    }
});

router.post('/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['username', 'password']);
        let response = await User.findByCredentials(body.username, body.password);
        if (response.errorCode !== 0) {
            res.send(createErrorResponse(response.errorCode, response.data));
            return;
        }

        let user = response.data;
        const token = await user.generateAuthToken();
        await user.setOnline();
        user._doc['password'] = null;
        user._doc['online'] = true;
        res.header('x-auth', token)
            .send(createResponse(0, user._doc));
    } catch (e) {
        logger.error(e.message);
        res.status(400).send(createErrorResponse(statusCodes.GENERAL_ERROR, e.message));
    }
});

module.exports = router;
