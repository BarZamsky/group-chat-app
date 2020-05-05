const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('./middleware/logger');
const routes = require('./api/routes');
const cors = require('cors');
const passport = require('passport');
const config = require('./config');
require('./config/passport')(passport);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/group-chat';
mongoose.connect(MONGODB_URI);
logger.info('connected to mongodb');

app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({extended: true}));

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use(flash());

app.use('/api/uploads', express.static('uploads'));
app.use('/api', routes);

const port = process.env.PORT || 5000;

app.listen(port, () => logger.log('debug',`server is running on port ${port}...`));
