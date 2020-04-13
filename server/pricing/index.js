const config = require('../config/config')

const Client = require('coinbase').Client;
const client = new Client({
    'apiKey': config.COINBASE_API_KEY,
    'apiSecret': config.COINBASE_API_SECRET,
    strictSSL: false
})

module.exports = {
    getBuyPrice: async () => new Promise((resolve, reject) => {
        return client.getBuyPrice({ 'currencyPair': config.CURRENCY_PAIR }, (err, obj) => {
            err ? reject(err) : resolve(obj.data)
        })
    }),
    getSellPrice: async () => new Promise((resolve, reject) => {
        return client.getSellPrice({ 'currencyPair' : config.CURRENCY_PAIR }, (err, obj) => {
            err ? reject(err) : resolve(obj.data)
        })
    }),
    getSpotPrice: async () => new Promise((resolve, reject) => {
        return client.getSpotPrice({ 'currencyPair' : config.CURRENCY_PAIR }, (err, obj) => {
            err ? reject(err) : resolve(obj.data)
        })
    }),
    getPrices: async function() {
        const results = await Promise.all([this.getSpotPrice(), this.getBuyPrice(), this.getSellPrice()])
        const ordering = ['spot', 'buy', 'sell']
        const dict = {}

        for (let i in ordering) {
            const order = ordering[i]
            const result = results[i]
            dict[order] = result
        }

        const data = {
            base: dict['buy']['base'],
            currency: dict['buy']['currency'],
            spot: dict['spot']['amount'],
            buy: dict['buy']['amount'],
            sell: dict['sell']['amount'],
            time: Date()
        }

        return data
    }
}