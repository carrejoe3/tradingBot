const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const util = require('util')
const setTimeoutPromise = util.promisify(setTimeout)
const app = express()
const pricing = require('./pricing')
const port = process.env.PORT || 5000
const login = require('./routes/api/users')

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
        const buyPrice = await pricing.getBuyPrice()
        console.log(`buy: ${buyPrice.amount}`)

        const sellPrice = await pricing.getSellPrice()
        console.log(`sell: ${sellPrice.amount}`)

        const spot = await pricing.getSpotPrice()
        console.log(`spot: ${spot.amount}`)
    } catch (error) {
        console.log(error)
    }

    await setTimeoutPromise(time)
    mainLoop()
}
