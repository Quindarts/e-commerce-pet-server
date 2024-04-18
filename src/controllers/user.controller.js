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
        console.log(listUser)
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

//[GET BY NAME]

async function getUserByName(req, res) {
    const username = req.params.username

    try {
        const user = await User.find({
            userName: { $regex: username, $options: 'i' },
        }).select('-password')

        if (!user) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No user found',
            })
        }
        if (user.isActive === false) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'All users are blocked',
            })
        }

        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Get users success.',
            user,
        })
    } catch (error) {
        console.log('Error in getUserByName:', error)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Internal server error',
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
    } = req.body

    try {
        const userOld = await User.findById({ _id: _id })

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
    }
}
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
    }
}

//[FILTER USER ]

const filterUser = async (req, res) => {
    const { offset, limit, sortField, sortType } = Object.assign({}, req.query)

    const {
        searchType,
        keywords,
        isActive,
        gender,
        role,
        rewardPoints,
        dateOfBirth,
    } = Object.assign({}, req.query)

    const query = {}

    if (keywords && searchType) {
        query[searchType] = {
            $regex: keywords,
            $options: 'i',
        }
    }
    if (isActive !== undefined && isActive !== '') {
        const activeArr = isActive.split(',')
        query['isActive'] = { $in: activeArr }
    }
    if (gender !== undefined && gender !== '') {
        const genderArr = gender.split(',')
        query['gender'] = { $in: genderArr }
    }
    if (role !== undefined && role !== '') {
        const roleArr = role.split(',')
        query['role'] = { $in: roleArr }
    }
    if (rewardPoints !== undefined && rewardPoints !== '') {
        const rewardPointsArr = rewardPoints.split(',')
        query['rewardPoints'] = { $in: rewardPointsArr }
    }
    if (dateOfBirth !== undefined && dateOfBirth !== '') {
        const dateOfBirthArr = dateOfBirth.split(',')
        query['dateOfBirth'] = { $in: dateOfBirthArr }
    }

    try {
        console.log('🚀 ~ filterUser ~ query:', query)
        const users = await User.find(query)
            .limit(parseInt(limit))
            .skip((parseInt(offset) - 1) * parseInt(limit))
            .sort({ [sortField]: sortType })
            .sort({ createdAt: -1 })
            .lean()
        console.log(users)
        const totalRows = await User.find(query).count()

        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            totalRows,
            users,
        })
    } catch (error) {
        console.log('🚀 ~ filterUser ~ error:', error)

        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to filter user.',
        })
    }
}

module.exports = {
    getAllUser,
    getUserById,
    updateUser,
    changeActiveUser,
    getUserByName,
    filterUser,
}
