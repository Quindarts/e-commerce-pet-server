const { ROUTE } = require('../utils/Routes')
const auth = require('./auth.route')
const address = require('./address.route')
function router(app) {
    app.use(ROUTE.AUTH, auth)
    app.use(ROUTE.ADDRESS, address)
}

module.exports = router
