const os = require('os')
const cpuCount = os.cpus().length
describe('Sample Test', () => {
    it('🚀RUNNING TESTING::::::::::', () => {
        expect(true).toBe(true)
        console.log('CPU COUNT::::::::::::', cpuCount)
    })
})

//TESTING API
const request = require('supertest')
const app = require('../index')
const { ROUTE } = require('../utils/Routes')
const { HTTP_STATUS } = require('../utils/constant')

describe('ROUTE.CATEGORY_ROOT', () => {
    it(`${ROUTE.CATEGORY_ROOT}:::::::`, async () => {
        const res = await request(app).get(ROUTE.CATEGORY_ROOT)
        expect(res.statusCode).toEqual(HTTP_STATUS.OK)
        expect(res.body)
    })
})
