const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const util = require('util')
const setTimeoutPromise = util.promisify(setTimeout)
const app = express()
const pricing = require('./pricing')
const port = process.env.PORT || 5000
const login = require('./routes/api/users')
const priceModel = require('./models/price')

app.use(bodyParser.json())
app.use(cors())
app.use('/api/login', login)

app.listen(port, async () => {
    console.log(`Server started on port ${port}`)

    mainLoop()
})

const mainLoop = async () => {
    const time = 10 * 1000

    try {
        const prices = await pricing.getPrices()
        const price = await priceModel.create(prices)
        console.log('Price obtained')
    } catch (error) {
        console.log(error)
    }

    await setTimeoutPromise(time)
    mainLoop()
}
