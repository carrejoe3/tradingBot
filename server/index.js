const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const pricing = require('./pricing')
const port = process.env.PORT || 5000
const login = require('./routes/api/users')
const database = require('./database')
const priceModel = require('./models/price')
const Trading = require('./trading')

app.use(bodyParser.json())
app.use(cors())
app.use('/api/login', login)

app.listen(port, async () => {
    console.log(`Server started on port ${port}`)

    await database.connect()
    setInterval(mainLoop, 10000)
})

const mainLoop = async () => {
    try {
        const prices = await pricing.getPrices()
        const price = await priceModel.create(prices)
        console.log('Price obtained')
        await Trading.onPrice(price)
    } catch (error) {
        console.log(error)
    }
}
