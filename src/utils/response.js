const { HTTP_STATUS } = require('./constant')

exports.sendError = (res, error) => {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: error.message,
    })
}

exports.sendWarning = (res, msg) => {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        status: HTTP_STATUS.BAD_REQUEST,
        message: msg,
    })
}

exports.sendUnauthenticated = (res) => {
    res.status(HTTP_STATUS.UNAUTHENTICATED).json({
        success: false,
        status: HTTP_STATUS.UNAUTHENTICATED,
        msg: 'Unauthenticated',
    })
}

exports.sendNotFound = (res, msg) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        status: HTTP_STATUS.NOT_FOUND,
        message: msg,
    })
}

exports.sendConflict = (res, msg) => {
    res.status(HTTP_STATUS.CONFLICT).json({
        success: false,
        status: HTTP_STATUS.CONFLICT,
        message: msg,
    })
}
