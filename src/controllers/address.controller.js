const Address = require('../models/address.model')
const { HTTP_STATUS } = require('../utils/constant')

//[GET ALL ADDRESS]

const getAllAddress = async (req, res) => {
    const listAddress = Address.find().lean();

    if (!listAddress) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
            success: false,
            status: HTTP_STATUS.NOT_FOUND,
            message: 'Address not found.',
        })
    }
    
}
//[GET ADDRESS BY ID]

//[POST ADDRESS]
const createAddress = async (req, res) => {
    try {
        const { provine, district, ward, detail, zipCode, country } = req.body
        const oldAdress = await Address.findOne({
            zipCode: zipCode,
        }).lean()
        if (oldAdress) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                success: false,
                status: HTTP_STATUS.CONFLICT,
                message: 'This address already exists. ',
            })
        }
        const newAddress = await Address.create({
            provine,
            district,
            ward,
            detail,
            zipCode,
            country,
        })
        if (!newAddress) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Failed to create new address. ',
            })
        }
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Create Address success.',
            newAddress,
        })
    } catch (error) {
        console.error('Failed to create new Address::::', error)
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to create new address.',
        })
    }
}
//[PUT ADDRESS]

//[DELETE ADDRESS]

module.exports = {
    createAddress,
}
