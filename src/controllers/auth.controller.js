var createError = require('http-errors')
const { HTTP_STATUS } = require('../utils/constant')
const helper = require('../helper/index')
const jwtHelper = require('../helper/jwt.helper')
const User = require('../models/user.model')

//[POST LOGIN ]
const login = async (req, res, next) => {
    const { userName, password, remmber } = req.body
    var refreshToken =
        req.body.refreshToken ||
        req.query.refreshToken ||
        req.headers['x-refresh-token']
    try {
        //Checked Username
        const user = await User.findOne({
            userName: userName,
        }).lean()

        if (!user) {
            return createError(HTTP_STATUS.NOT_FOUND, 'User not found')
        } else {
            //Checked Password
            const decPassword = helper.decryptedPassword(user.password)
            if (decPassword !== password) {
                return createError(
                    HTTP_STATUS.UNAUTHORIZED,
                    'Invaild userName or password'
                )
            }

            //Checked Active
            if (!user.isActive) {
                return createError(
                    HTTP_STATUS.UNAUTHORIZED,
                    'Your account has not been activated'
                )
            }
            //Checked RefreshToken
            if (!refreshToken) {
                refreshToken = generateToken(user._id, '30000h')
            }

            const accessToken = remmber
                ? generateToken(user._id, '24h')
                : generateToken(user._id, '1h')

            console.log(
                '🚀 ~ file: auth.controller.js:37 ~ login ~ accessToken:',
                accessToken
            )
            console.log(
                '🚀 ~ file: auth.controller.js:40 ~ login ~ refreshToken:',
                refreshToken
            )

            res.status(HTTP_STATUS.OK).json({
                success: true,
                status: 200,
                user: {
                    id: user._id,
                    userName: user.userName,
                    role: user.role,
                    email: user.email,
                    isActive: user.isActive,
                },
                tokenList: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
            })
        }
    } catch (error) {
        console.log(error)
    }
}

//[POST REGISTER]
const register = async (req, res) => {
    const { email, userName, password, first_name, last_name } = req.body

    const oldUser = await User.findOne({
        userName: userName,
    }).lean()
    console.log(
        '🚀 ~ file: auth.controller.js:84 ~ register ~ oldUser:',
        oldUser
    )

    if (oldUser) {
        var err = new createError.NotFound()
        return err
        // return res
        //     .status(HTTP_STATUS.NOT_FOUND)
        //     .json({ message: 'User Already Exist. Please Login' })
    }
    const encryptedPassword = helper.encryptedPassword(password)
    console.log(
        '🚀 ~ file: auth.controller.js:100 ~ register ~ encryptedPassword:',
        encryptedPassword
    )
    const newUser = await User.create({
        email,
        userName,
        password: encryptedPassword,
        first_name,
        last_name,
    })

    const accessToken = jwtHelper.generateToken(newUser._id, '1h')
    console.log(
        '🚀 ~ file: auth.controller.js:113 ~ register ~ accessToken:',
        accessToken
    )
    const refreshToken = jwtHelper.generateToken(newUser._id, '30000h')
    console.log(
        '🚀 ~ file: auth.controller.js:114 ~ register ~ refreshToken:',
        refreshToken
    )

    res.status(HTTP_STATUS.OK).json({
        success: true,
        status: 200,
        user: {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            userName: newUser.userName,
            email: newUser.email,
            password: newUser.encryptedPassword,
        },
        tokenList: {
            accessToken,
            refreshToken,
        },
    })
}

//[PUT FORGOT-PASSWORD]
const forgotPassword = async () => {}

//[PUT CHANGE-PASSWORD]
const changePassword = async () => {}

module.exports = {
    login,
    register,
    changePassword,
}
