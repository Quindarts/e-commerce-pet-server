const jwtHelper = require('../helper/jwt.helper')
const User = require('../models/user.model')
const { HTTP_STATUS, ROLES } = require('../utils/constant')
const _ = require('lodash')

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
//[Help]
const routingRole = async (role) => {
    switch (role) {
        case ROLES.ADMIN.name:
            return ROLES.ADMIN.value
        case ROLES.MOD.name:
            return ROLES.MOD.value
        case ROLES.OWNER.name:
            return ROLES.OWNER.value
        case ROLES.USER.name:
            return ROLES.USER.value
        case ROLES.WAREHOUSE.name:
            return ROLES.WAREHOUSE.value
        default:
            return 0
    }
}
//[Handler]
const checkCurrentRole = async (req, res, next, role) => {
    const token = req.headers['authorization']?.replace('Bearer ', '')
    const decode = jwtHelper.verifyToken('access', token)
    var user_id = decode.payload.data.id

    const current_user = await User.findOne({
        _id: user_id,
        isActive: true,
    }).lean()

    if (!current_user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            success: false,
            status: HTTP_STATUS.UNAUTHORIZED,
            message: 'User is not exits',
        })
    }
    const current_role = await routingRole(current_user.role)

    if (current_role < role.value) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({
            success: false,
            status: HTTP_STATUS.FORBIDDEN,
            message: 'User does not have access to this feature.',
        })
    } else next()
}

module.exports = { isActiveUser, checkCurrentRole }
