const { validationResult } = require('express-validator')
const { HTTP_STATUS } = require('../utils/constant')

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
        status: HTTP_STATUS.BAD_REQUEST,
        sucess: false,
        message: errors.array()[0].msg,
    })
}
module.exports = {
    validate,
}
