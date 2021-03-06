const express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    authenticate =  require('../../middleware/authenticate'),
    {Channel} = require('../../models/Channel'),
    {User} = require('../../models/User'),
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

        res.send(createResponse(0, response.data._doc));
    } catch (e) {
        logger.log('error', e.messages);
        res.status(200).send(createErrorResponse(errorCodes.GENERAL_ERROR, e.message));
    }
});

//get channel's members
router.get('/:name/members', authenticate, async (req, res) => {
    if (!req['user']) {
        res.status(401).send()
    }

    try {
        let response = await Channel.getMembersList(req.params.name);
        if (response.errorCode !== 0) {
            res.send(createResponse(response.errorCode, response.data));
            return
        }

        const channelUsers = response.data;
        const members = [];
        for (const id of channelUsers) {
            const user = await User.findById(id);
            members.push(user);
        }

        res.send(createResponse(0, members));
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

router.post('/add', authenticate, async (req, res) => {
    if (!req['user']) {
        res.status(401).send()
    }

    try {
        const body = _.pick(req.body, ['users', 'channelName']);
        const response = await Channel.findChannel(body['channelName']);
        if (response.errorCode !== 0) {
            res.send(createResponse(response.errorCode, response.data));
            return
        }

        let channel = response.data;
        channel = await channel.addUsers(body['users']);
        res.send(createResponse(0, channel._doc));
    } catch (e) {
        logger.log('error', e.message);
        res.status(200).send(createErrorResponse(errorCodes.FAILED_CREATE_CHANNEL, e.message));
    }
});


module.exports = router;
