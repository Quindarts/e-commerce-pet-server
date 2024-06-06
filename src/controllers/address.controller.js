const Address = require('../models/address.model')
const { HTTP_STATUS } = require('../utils/constant')

//[GET ALL ADDRESS]

const getAllAddress = async (req, res) => {
    try {
        const listAddress = await Address.find().lean()
        if (!listAddress) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'List Address not found.',
            })
        }
        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Get list address success.',
            listAddress,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: address.controller.js:17 ~ getAllAddress ~ error:',
            error
        )
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get list address.',
        })
    }
}

//[GET ADDRESS BY ID] /:address_id
const getAddressByID = async (req, res) => {
    const { address_id } = req.params
    try {
        const address = await Address.findOne({
            _id: address_id,
        }).lean()
        if (!address) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'No Address found.',
            })
        }
        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Get address success.',
            address,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: address.controller.js:17 ~ getAllAddress ~ error:',
            error
        )
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to get address.',
        })
    }
}

//[POST ADDRESS] create address
const createAddress = async (req, res) => {
    try {
        const {
            provinceName,
            districtName,
            wardName,
            detail,
            zipCode,
            country,
        } = req.body

        const oldAdress = await Address.findOne({
            'ward.wardName': wardName.toString().trim(),
            detail: detail.toString().trim(),
            zipCode: zipCode.toString().trim(),
            'district.districtName': districtName.toString().trim(),
            'province.provinceName': provinceName.toString().trim(),
            country: country.toString().trim(),
        }).lean()

        if (oldAdress) {
            return res.status(HTTP_STATUS.CONFLICT).json({
                success: false,
                status: HTTP_STATUS.CONFLICT,
                message: 'This address already exists. ',
                oldAdress,
            })
        }

        const countAddress = await Address.count({})
        const newAddress = await Address.create({
            province: {
                provinceName: provinceName,
                provinceId: countAddress + 1,
            },
            district: {
                districtName: districtName,
                districtId: countAddress + 1,
            },
            ward: {
                wardName: wardName,
                wardId: countAddress + 1,
            },
            detail,
            zipCode,
            country,
        })

        if (!newAddress) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Your address is not valid',
            })
        }
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Create Address success.',
            newAddress,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: address.controller.js:66 ~ createAddress ~ error:',
            error
        )
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to create new address.',
        })
    }
}

//[PUT ADDRESS]  update address
const updateAddress = async (req, res) => {
    try {
        const { address_id } = req.params
        const { province, district, ward, detail, zipCode, country } = req.body

        const oldAdress = await Address.findOne({
            _id: address_id,
        }).lean()

        if (!oldAdress) {
            return res.status(HTTP_STATUS.NOT_FOUND).json({
                success: false,
                status: HTTP_STATUS.NOT_FOUND,
                message: 'This address already exists. ',
            })
        }

        const updateAddress = await Address.findByIdAndUpdate(
            {
                _id: address_id,
            },
            {
                $set: {
                    province,
                    district,
                    ward,
                    detail,
                    zipCode,
                    country,
                },
            },
            { new: true }
        )

        if (!updateAddress) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Update address failed.',
            })
        }
        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            status: HTTP_STATUS.CREATED,
            message: 'Update Address success.',
            address: updateAddress,
        })
    } catch (error) {
        console.log(
            '🚀 ~ file: address.controller.js:66 ~ updateAddress ~ error:',
            error
        )
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to update address.',
        })
    }
}

//[DELETE ADDRESS]
const deleteAddress = async (req, res) => {
    try {
        const { address_id } = req.params || req.body

        const deleteAddress = await Address.findByIdAndDelete(address_id)

        if (!deleteAddress) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                status: HTTP_STATUS.BAD_REQUEST,
                message: 'Delete Failed. No Address valid.',
            })
        }

        res.status(HTTP_STATUS.OK).json({
            success: true,
            status: HTTP_STATUS.OK,
            message: 'Delete Address success.',
        })
    } catch (err) {
        console.log(
            '🚀 ~ file: address.controller.js:187 ~ deleteAddress ~ err:',
            err
        )
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: 'Failed to delete address.',
        })
    }
}

module.exports = {
    createAddress,
    getAllAddress,
    getAddressByID,
    updateAddress,
    deleteAddress,
}
