const jwt = require('jsonwebtoken');

const oktaAuth = (req, res, next) => {
    try {
        if (req.url.startsWith('/api')) {
            const authHeader = req.headers.authorization;
            if (authHeader) {
                const token = authHeader.split(' ')[1];
                if (token) {
                    var decodedToken = jwt.decode(token);
                    if (!isValidIssuer(decodedToken) || !isValidAud(decodedToken) || isExpired(decodedToken)) {
                        res.sendStatus(401);
                    }
                    next();
                }
                else {
                    console.log('Could not find bearer token');
                    res.sendStatus(401);
                }
            } else {
                console.log('Could not find the authorization header');
                res.sendStatus(401);
            }
        } else {
            
            next();
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

function isValidIssuer(decodedToken) {
    if (decodedToken && decodedToken.iss) {
        return decodedToken.iss === process.env.AppInfo;
    } else {
        console.log('invalid issuer!', decodedToken.iss, process.env.AppInfo);
        return false;
    }
}

function isValidAud(decodedToken) {
    if (decodedToken && decodedToken.aud) {
        return decodedToken.aud === process.env.Audience;
    } else {
        console.log('invalid audience!');
        return false;
    }
}

function isExpired(decodedToken) {
    if (decodedToken && decodedToken.exp) {
        return Date.now() >= decodedToken.exp * 10000;
    } else {
        console.log('token had expired!');
        return false;
    }
}

module.exports = { oktaAuth }