const { ROUTE } = require('../utils/Routes')
const auth = require('./auth.route')
const address = require('./address.route')
const category = require('./category.route')
const user = require('./user.route')
const product = require('./product.route')

function router(app) {
    
    app.use(ROUTE.AUTH, auth)
    app.use(ROUTE.ADDRESS, address)
    app.use(ROUTE.CATEGORY, category)
    app.use(ROUTE.USER, user)
    app.use(ROUTE.PRODUCT, product)
}

module.exports = router
