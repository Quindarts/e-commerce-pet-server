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
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
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
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get user by id.',
        })
    }
}

//[UPDATE USER]
const updateUser = async (req, res) => {
    const {
        _id,
        first_name,
        last_name,
        phone,
        address,
        rewardPoints,
        gender,
        avatar,
        role,
        isActive,
        idFacebook,
        idGoogle,
        dateOfBirth,
        email,
    } = req.body
    const { user_id } = req.params
    try {
        const id = user_id || _id
        const userOld = await User.findById({ _id: id })

        if (!userOld) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No User found',
            })
        }
        const userUpdate = await User.findByIdAndUpdate(
            { _id: _id },
            {
                $set: {
                    first_name,
                    last_name,
                    phone,
                    address,
                    rewardPoints,
                    gender,
                    avatar,
                    role,
                    isActive,
                    idFacebook,
                    idGoogle,
                    dateOfBirth,
                    email,
                },
            },
            { new: true }
        )
        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Update User success.',
            user: userUpdate,
        })
    } catch (error) {
        console.log('🚀 ~ updateUser ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to update user.',
        })
    }
}
//[CHANGE ACTIVE USER]
const changeActiveUser = async (req, res) => {
    const { user_id } = req.params
    try {
        const currentUser = await User.findById(user_id).lean()

        if (!currentUser) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No User found',
            })
        }
        const newActive = !currentUser.isActive
        const userUpdate = await User.findByIdAndUpdate(
            user_id,
            {
                $set: {
                    isActive: newActive,
                },
            },
            {
                new: true,
            }
        )
        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Change active User success.',
            user: userUpdate,
        })
    } catch (error) {
        console.log('🚀 ~ unActiveUser ~ error:', error)
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to change active user.',
        })
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email: email }).lean()
        if (!user) {
            res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No email found',
            })
        }
    } catch (error) {
        console.log('🚀 ~ forgotPassword ~ error:', error)
    }
}
module.exports = { getAllUser, getUserById, updateUser, changeActiveUser }
