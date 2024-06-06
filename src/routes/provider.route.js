const express = require('express')
const router = express.Router()
const {
    getManyProviders,
    createProvider,
    getProviderById,
    deleteProviderById,
    updateProvider,
} = require('../controllers/provider.controller')

const {
    isValidGetManyQueryParams,
    isValidCreateProviderRequest,
    isValidUpdateProviderRequest,
} = require('../middlewares/provider.validation')
const { ROUTE } = require('../utils/Routes')

router.post('/', isValidCreateProviderRequest, createProvider)
router.get('/', isValidGetManyQueryParams, getManyProviders) // get many providers
router.get(ROUTE.PROVIDER_BY_ID, getProviderById) // provider by id
router.put(ROUTE.PROVIDER_BY_ID, isValidUpdateProviderRequest, updateProvider) // update one
router.delete(ROUTE.PROVIDER_BY_ID, deleteProviderById) // delete by id

module.exports = router
