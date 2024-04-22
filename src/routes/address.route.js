const express = require('express')
const { ROUTE } = require('../utils/Routes')
const {
    createAddress,
    getAllAddress,
    getAddressByID,
    updateAddress,
    deleteAddress,
} = require('../controllers/address.controller')
const {
    isValidProvinceLength,
    isValidCountryLength,
    isHavedAddressId,
} = require('../middlewares/address.validations')
const { validate } = require('../middlewares/validation')
const router = express.Router()

//[GET] get all address
router.get('/', getAllAddress)

//[GET] get address by ID
router.get(ROUTE.GET_ADDRESS_BY_ID, getAddressByID)

//[POST] create address
router.post(
    '/',
    // isValidProvinceLength,
    isValidCountryLength,
    validate,
    createAddress
)

//[PUT] update address by ID
router.put(
    ROUTE.GET_ADDRESS_BY_ID,
    // isValidProvinceLength,
    isValidCountryLength,
    validate,
    updateAddress
)

//[DELETE] delete address by ID
router.delete(
    ROUTE.GET_ADDRESS_BY_ID,
    isHavedAddressId,
    validate,
    deleteAddress
)

module.exports = router
