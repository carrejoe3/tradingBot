const config = require('../config/config')

const Client = require('coinbase').Client;
const client = new Client({
    'apiKey': config.COINBASE_API_KEY,
    'apiSecret': config.COINBASE_API_SECRET,
    strictSSL: false
})

module.exports = {
    getBuyPrice: async () => new Promise((resolve, reject) => {
        const currencyPair = 'BTC-USD'

        return client.getBuyPrice({ 'currencyPair': currencyPair }, (err, obj) => {
            err ? reject(err) : resolve(obj)
        })
    })
}