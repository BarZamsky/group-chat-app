const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./middleware/logger');
const compression = require('compression');
const allowCrossDomain = require('./middleware/allowCrossDomain');
const path = require('path');
const expressSession = require('express-session')({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
});

const passport = require('passport');
require('./config/passport')(passport);
const routes = require('./api/routes');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/group-chat';

logger.log('debug',`trying to connect to ${MONGODB_URI}`);
mongoose.connect(MONGODB_URI,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(connection => {
        logger.log('debug','connected successfully to mongodb');
}).catch(err => {
    logger.log('error','db connection failed, '+err);
});

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession);
app.use(compression());
app.use(passport.initialize());
app.use(passport.session());
app.use(allowCrossDomain);
app.use('/api', routes);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => logger.log('debug',`server is running on port ${port}...`));
