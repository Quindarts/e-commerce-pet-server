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
    return jwt.verify(token, key)
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
