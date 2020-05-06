const express = require('express'),
    router = express.Router();

router.use('/', require('./auth'));

module.exports = router;
