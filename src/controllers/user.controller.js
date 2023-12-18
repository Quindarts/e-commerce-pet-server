const User = require('../models/user.model')
const { HTTP_STATUS } = require('../utils/constant')

//[GET]
async function getAllUser(req, res) {
    try {
        const listUser = await User.find().lean()

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

module.exports = { getAllUser }
