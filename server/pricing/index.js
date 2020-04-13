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
    })
}