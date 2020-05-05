function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,OPTIONS');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header("Access-Control-Allow-Headers", "Content-Type, Set-Cookie, authorization,x-auth");
    res.header("Access-Control-Allow-Credential", 'true');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
}

module.exports = allowCrossDomain