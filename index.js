const CoinbasePro = require('coinbase-pro');
const config = require('./configuration')

const auth = {
    apiKey: config.get('COINBASE_PRO_API_KEY'),
    apiSecret: config.get('COINBASE_PRO_API_SECRET'),
    passphrase: config.get('COINVASE_PRO_API_PASSPHRASE'),
    useSandbox: true
}

const client = new CoinbasePro(auth)
const publicClient = new CoinbasePro.PublicClient()

const product = 'BTC-GBP'

async function getHistoricalRates () {
    const results = await publicClient.getProductHistoricRates(product, {
        granularity: 300
    })

    console.log(results)
}

getHistoricalRates()