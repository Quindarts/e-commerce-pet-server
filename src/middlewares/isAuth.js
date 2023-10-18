const { verifyToken } = require('../helper/jwt.helper')
const { HTTP_STATUS } = require('../utils/constant')

const isAuth = async (res, req, next) => {
    const tokenFromClient =
        req.body.accessToken ||
        req.query.accessToken ||
        req.headers['x-access-token']

    if (!tokenFromClient) {
        createError(HTTP_STATUS.FORBIDDEN, 'No token provided.')
    } else {
        try {
            const decoded = await verifyToken(tokenFromClient)
            req.jwtDecoded = decoded
            next()
        } catch (error) {
            createError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
        }
    }
}

module.exports = { isAuth }
