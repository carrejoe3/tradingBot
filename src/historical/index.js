const CoinbasePro = require('coinbase-pro')

class HistoricalService {
    constructor({ start, end, interval, product }) {
        this.publicClient = new CoinbasePro.PublicClient()
        this.start = start
        this.end = end
        this.interval = interval
        this.product = product
    }

    async getData () {
        try {
            const results = await this.publicClient.getProductHistoricRates(this.product, {
                start: this.start,
                end: this.end,
                granularity: this.interval
            })

            return results
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = HistoricalService