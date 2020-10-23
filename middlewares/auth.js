const expressJwt = require('express-jwt');

function isAuthenticated() {

    return expressJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ['HS256'],
        getToken: function(req) {
            return req.cookies.token;
        }
    });
}

module.exports = isAuthenticated;