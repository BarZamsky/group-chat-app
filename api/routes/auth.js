const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    {User} = require('../../models/User'),
    logger = require("../../middleware/logger");

router.post('/register', passport.authenticate('local-signup'), async (req, res) => {
    if (!req.user) {
        res.send('user already exists')
    }
    res.json(req.user)
});

router.post('/login', passport.authenticate('local-login'), (req, res) => {
    res.json(req.user)
});

module.exports = router;
