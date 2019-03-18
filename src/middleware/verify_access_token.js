const response = require('../utils/response');
const jwt = require('jsonwebtoken');
const key = require('../../key');

function verifyAccessToken(req, res, next) {
    console.log("req:", req);
    const token = req.headers["access_token"];
    console.log("Header: ",req.headers);
    console.log(token);
    if (token) {
        jwt.verify(token, key.ACCESS_SECRET_KEY, function (err, decoded) {
            if (err) return res.json(response.unauth());
            else req.tokenData = decoded;
            next();
        })
    } else return res.json(response.fail("Token Missing"));
}

module.exports = {
    verifyAccessToken
};