const { ROUTE } = require('../utils/Routes')
const auth = require('./auth.route')
const address = require('./address.route')
const category = require('./category.route')

function router(app) {
    app.use(ROUTE.AUTH, auth)
    app.use(ROUTE.ADDRESS, address)
    app.use(ROUTE.CATEGORY, category)
}

module.exports = router
