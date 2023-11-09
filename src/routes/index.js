const { ROUTE } = require('../utils/Routes')
const auth = require('./auth.route')

function router(app) {
    app.use(ROUTE.AUTH, auth)
}

module.exports = router
