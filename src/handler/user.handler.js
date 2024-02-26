const jwtHelper = require('../helper/jwt.helper')
const User = require('../models/user.model')
const { HTTP_STATUS } = require('../utils/constant')

const isActiveUser = async (req, res, next) => {
    const accessToken =
        req.body.token ||
        req.query.token ||
        req.headers['authorization'].replace('Bearer ', '')

    const decode = await jwtHelper.verifyToken('access', accessToken)
    var user_id = decode.payload.data.id

    try {
        const user = await User.findOne({ _id: user_id }).lean()
        if (!user) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No User found',
            })
        }
        if (!user.isActive) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'User is blocked',
            })
        }
        req.user_id = user_id
        next()
    } catch (error) {
        console.log('🚀 ~ isActiveUser ~ error:', error)
    }
}

module.exports = { isActiveUser }
