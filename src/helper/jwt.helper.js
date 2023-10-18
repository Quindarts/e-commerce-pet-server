const jwt = require('jsonwebtoken')
function generateToken(id, tokenLife) {
    const userData = {
        id: id,
    }
    return jwt.sign({ data: userData }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: tokenLife,
    })
}
function verifyToken(token) {
    return jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, decoded) => {
        if (error) {
            return reject(error)
        }
        resolve(decoded)
    })
}

function randomTokenString() {
    return Crypto.randomBytes(40).toString('hex')
}

module.exports = { verifyToken, generateToken, randomTokenString }
