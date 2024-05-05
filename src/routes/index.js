const { ROUTE } = require('../utils/Routes')
const auth = require('./auth.route')
const address = require('./address.route')
const category = require('./category.route')
const user = require('./user.route')
const product = require('./product.route')
const cart = require('./cart.route')
const attributeProduct = require('./attributeProduct.route')
const payment = require('./payment.route')
const order = require('./order.route')
const upload = require('./upload.route')
const provider = require('./provider.route')

function router(app) {
    app.use(ROUTE.AUTH, auth)
    app.use(ROUTE.ADDRESS, address)
    app.use(ROUTE.CATEGORY, category)
    app.use(ROUTE.USER, user)
    app.use(ROUTE.PRODUCT, product)
    app.use(ROUTE.CART, cart)
    app.use(ROUTE.ATTRIBUTE_PRODUCT, attributeProduct)
    app.use('/payment', payment)
    app.use(ROUTE.ORDER, order)
    app.use('/upload', upload)
    app.use(ROUTE.PROVIDER, provider)
}

module.exports = router
