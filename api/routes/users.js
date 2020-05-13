const express = require('express'),
    router = express.Router(),
    {User} = require('../../models/User'),
    authenticate =  require('../../middleware/authenticate'),
    statusCodes = require('../../utils/ErrorCodes'),
    {createErrorResponse, createResponse} = require('../../utils/ServerResponse'),
    logger = require("../../middleware/logger");

router.get('/', authenticate, async (req, res) => {
    if (!req['user']) {
        res.status(401).send()
    }

    const id = req['user']['_id'];
    let users = await User.getUsers(id);
    res.status(200).send(createResponse(0, users))
});

module.exports = router;
