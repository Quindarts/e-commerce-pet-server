const jwt = require('jsonwebtoken')

function generateToken(type = 'access', payload, tokenLife) {
    const key = type
        ? process.env.TOKEN_SECRET_KEY
        : process.env.REFRESH_TOKEN_SECRET_KEY

    return jwt.sign({ data: payload }, key, {
        expiresIn: tokenLife,
    })
}
function verifyToken(type = 'access', token) {
    const key = type
        ? process.env.TOKEN_SECRET_KEY
        : process.env.REFRESH_TOKEN_SECRET_KEY

    try {
        return { payload: jwt.verify(token, key), expired: false }
    } catch (error) {
        if (error.name == 'TokenExpiredError') {
            return { payload: jwt.decode(token), expired: true }
        }
        throw error
    }
}
function signatureToken(token) {
    return token.split('.')[2]
}
function randomTokenString() {
    return Crypto.randomBytes(40).toString('hex')
}

module.exports = {
    verifyToken,
    generateToken,
    randomTokenString,
    signatureToken,
}
