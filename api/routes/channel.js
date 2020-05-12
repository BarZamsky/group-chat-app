const express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    authenticate =  require('../../middleware/authenticate'),
    {Channel} = require('../../models/Channel'),
    statusCodes = require('../../utils/StatusCodes'),
    {createResponse, createErrorResponse} = require('../../utils/ServerResponse'),
    logger = require("../../middleware/logger");

// get user's active channels
router.get('/', authenticate, async (req, res) => {
    if (!req['user']) {
        res.status(401).send()
    }

    try {
        const userId = req['user']['_id'];
        let channels = await Channel.getChannels(userId);
        if (!channels) {
            res.send(createResponse(statusCodes.NO_CHANNELS_YET, "active channels not found"));
            return
        }

        res.send(createResponse(0, channels));
    } catch (e) {
        logger.log('error', e.messages);
        res.status(200).send(createErrorResponse(statusCodes.GENERAL_ERROR, e.message));
    }
});

// create new channel
router.post('/', authenticate, async (req, res) => {
    if (!req['user']) {
        res.status(401).send()
    }

    try {
        const body = _.pick(req.body, ['name','topic','description','private']);
        body['users'] = [req['user']['_id']];

        const channel = await Channel.createChannel(body);
        if (!channel) {
            res.send(createResponse(statusCodes.FAILED_CREATE_CHANNEL, "failed to create new channel"));
            return
        }

        res.send(createResponse(0, channel._doc));
    } catch (e) {
        logger.log('error', e.message);
        res.status(200).send(createErrorResponse(statusCodes.GENERAL_ERROR, e.message));
    }
});

module.exports = router;
