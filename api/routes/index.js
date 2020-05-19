const express = require('express'),
    router = express.Router();

router.use('/', require('./auth'));
router.use('/channels', require('./channels'));
router.use('/users', require('./users'));

module.exports = router;
