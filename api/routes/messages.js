const express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    authenticate =  require('../../middleware/authenticate'),
    {Channel} = require('../../models/Channel'),
    {User} = require('../../models/User'),
    {Message} = require('../../models/Message'),
    errorCodes = require('../../utils/ErrorCodes'),
    {createResponse, createErrorResponse} = require('../../utils/ServerResponse'),
    logger = require("../../middleware/logger");

//Get user's direct messages list
router.get('/direct', authenticate, async (req, res) => {
    if (!req['user']) {
        res.status(401).send()
    }
    try {
        const id = req['user']['_id'];
        const user = await User.getUser(id);
        const messages = user.messages;
        const directMessagesList = [];
        for (const id of messages) {
            const user = await User.findById(id);
            directMessagesList.push(user);
        }


        res.send(createResponse(0, directMessagesList));
    } catch (e) {
        logger.log('error', e.messages);
        res.status(200).send(createErrorResponse(errorCodes.GENERAL_ERROR, e.message));
    }
});

module.exports = router;
