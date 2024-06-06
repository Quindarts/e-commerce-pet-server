const { HTTP_STATUS } = require('../utils/constant')
const helperToken = require('../helper/jwt.helper')

const isRevokedToken = (req, res, next) => {
    try {
        const accessToken =
            req.body.token ||
            req.query.token ||
            req.headers['authorization'].replace('Bearer ', '')

        if (!accessToken) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({
                success: false,
                status: HTTP_STATUS.FORBIDDEN,
                message: 'No token provided.',
            })
        }
    } catch (error) {
        console.log(
            '🚀 ~ file: checkToken.js:7 ~ isRevokedToken ~ error:',
            error
        )
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Token is not valid.',
        })
    }
}
const isExpiredToken = (req, res, next) => {
    try {
        const token =
            req.body.token ||
            req.query.token ||
            req.headers['authorization']?.replace('Bearer ', '')

        if (!token) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({
                success: false,
                status: HTTP_STATUS.FORBIDDEN,
                message: 'No token provided.',
            })
        }
        const decode = helperToken.verifyToken('access', token)

        if (decode.expired) {
            return res.status(HTTP_STATUS.FORBIDDEN).json({
                success: false,
                status: HTTP_STATUS.FORBIDDEN,
                message: 'Token expired.',
            })
        }

        req.decode = decode
        next()
    } catch (error) {
        console.log('🚀 ~ file: checkToken.js:16 ~ error:', error)

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Token is not valid.',
        })
    }
}
module.exports = { isExpiredToken, isRevokedToken }
