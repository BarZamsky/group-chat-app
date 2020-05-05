const express = require('express'),
    router = express.Router(),
    passport = require('passport'),
    logger = require("../../middleware/logger");

router.post('/register', passport.authenticate('local-signup',{ failureRedirect: '/login' }), async (req, res) => {
    res.json(req.user)
});

router.post('/login', passport.authenticate('local-login',{ failureRedirect: '/login' }), async (req, res) => {
    res.json(req.user)
});

module.exports = router;
