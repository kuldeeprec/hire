const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const env = process.env.NODE_ENV

const createJWT = (profile) => {
    let issuer;

    switch (env) {
        case "local":
        case "dev":
            issuer = 'https://dev.quizzes.prograd.org/';
            break;
        case "staging":
        case "preprod":
        case "prod":
            issuer = 'https://quizzes.prograd.org/';
            break;
    }

    const user = {
        uid: profile.uid,
        name: profile.name,
        email: profile.email,
        access_type: profile.user_type,
        o_id: profile.o_id,
        domain: profile.domain,
        organization_name: profile.organization_name,
        vendor_id: 'VS_7',
        iat: Math.floor(Date.now() / 1000) - 30,
        aud: issuer,
        iss: issuer
    };

    return jwt.sign(
        user, 
        keys.jwt.secret, 
        { jwtid: profile.uid + '-' + new Date().getTime() }, 
        { expiresIn: '5d' }
    );
};

const createQuizzesJWT = (profile) => {
    let issuer;

    switch (env) {
        case "local":
        case "dev":
            issuer = 'https://dev.quizzes.prograd.org/';
            break;
        case "staging":
        case "preprod":
        case "prod":
            issuer = 'https://quizzes.prograd.org/';
            break;
    }

    const user = {
        uid: profile.uid,
        name: profile.name,
        access_type: profile.user_type,
        secondary_id: profile.o_id,
        domain: profile.domain,
        organisation_name: profile.organization_name,
        vendor_id: 'VS_7',
        iat: Math.floor(Date.now() / 1000) - 30,
        aud: issuer,
        iss: issuer
    };

    return jwt.sign(
        user, 
        keys.jwt.secret, 
        { jwtid: profile.uid + '-' + new Date().getTime() }, 
        { expiresIn: '5d' }
    );
};


const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    /*if token exists*/
    if (token) {
        if (token.startsWith('Bearer ')) {
            /*Remove Bearer from string*/
            token = token.slice(7, token.length);
        }
        /*verify token*/
        // verify makes sure that the token hasn't expired and has been issued by us
        jwt.verify(token, keys.jwt.secret, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(403).json({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            /*if token is valid*/
            else {
                req.token = decoded;
                req.tokenRaw = token;
                next();
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Authentication error: Auth token is not supplied'
        });
    }
};

const checkProgradToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    /*if token exists*/
    if (token) {
        if (token.startsWith('Bearer ')) {
            /*Remove Bearer from string*/
            token = token.slice(7, token.length);
        }
        /*verify token*/
        // verify makes sure that the token hasn't expired and has been issued by us
        jwt.verify(token, keys.jwt.prograd_secret, (err, decoded) => {
            if (err) {
                console.log(err);
                return res.status(403).json({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            /*if token is valid*/
            else {
                req.token = decoded;
                req.tokenRaw = token;
                next();
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Authentication error: Auth token is not supplied'
        });
    }
};

const decodeToken = (token) => {
    const decodedToken = jwt.decode(token, { complete: true });
    return decodedToken.payload;
}

module.exports = {
    createJWT,
    createQuizzesJWT,
    checkToken,
    checkProgradToken,
    decodeToken
};