const express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    authenticate =  require('../../middleware/authenticate'),
    {Channel} = require('../../models/Channel'),
    errorCodes = require('../../utils/ErrorCodes'),
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
            res.send(createResponse(errorCodes.NO_CHANNELS_YET, "active channels not found"));
            return
        }

        res.send(createResponse(0, channels));
    } catch (e) {
        logger.log('error', e.messages);
        res.status(200).send(createErrorResponse(errorCodes.GENERAL_ERROR, e.message));
    }
});

// get channel
router.get('/:name', authenticate, async (req, res) => {
    if (!req['user']) {
        res.status(401).send()
    }

    try {
        let response = await Channel.findChannel(req.params.name);
        if (response.errorCode !== 0) {
            res.send(createResponse(response.errorCode, response.data));
            return
        }

        res.send(createResponse(0, response.data));
    } catch (e) {
        logger.log('error', e.messages);
        res.status(200).send(createErrorResponse(errorCodes.GENERAL_ERROR, e.message));
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

        const channel = new Channel(body);
        await channel.save();
        res.send(createResponse(0, channel._doc));
    } catch (e) {
        logger.log('error', e.message);
        res.status(200).send(createErrorResponse(errorCodes.FAILED_CREATE_CHANNEL, e.message));
    }
});


module.exports = router;
