const User = require('../models/user.model')
const { HTTP_STATUS } = require('../utils/constant')

//[GET]
async function getAllUser(req, res) {
    const { limit, offset } = Object.assign({}, req.query)
    console.log('🚀 ~ getAllUser ~ limit:', limit)

    try {
        const listUser = await User.find()
            .limit(limit)
            .skip((offset - 1) * limit)
            .sort({ createdAt: -1 })
            .lean()

        if (!listUser) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'List user already exists. ',
            })
        }

        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Get list user success.',
            listUser,
            params: {
                limit: limit,
                page: offset,
            },
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: user.controller.js:10 ~ getAllUser ~ error:',
            error
        )
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get user.',
        })
    }
}
//[GET BY ID]
async function getUserById(req, res) {
    const { user_id } = req.params
    try {
        const user = await User.findOne({ _id: user_id }).lean()
        if (!user) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No User found',
            })
        }
        if (!user.isActive) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'User is blocked',
            })
        }
        
        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Get User success.',
            user,
        })
    } catch (error) {
        console.log('🚀 ~ getUserById ~ error:', error)
    }
}
module.exports = { getAllUser, getUserById }
