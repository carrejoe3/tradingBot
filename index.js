const program = require('commander')
const config = require('./configuration')
const helperFunctions = require('./src/helperFunctions')
const HistoricalData = require('./src/historical')

const now = new Date()
const yesterday = new Date(now.getTime() - (24 * 60 * 60 * 1e3))

program.version('1.0.0')
    .option('-i, --interval [interval]', 'Interval, in seconds, for candlestick', 300)
    .option('-p --product [product]', 'Product identifier', 'BTC-GBP')
    .option('-s --start [start]', 'Start time in unix seconds', helperFunctions.toDate, yesterday)
    .option('-e --end [end]', 'End time in unix seconds', helperFunctions.toDate, now)
    .parse(process.argv)

const main = async function() {
    const { interval, product, start, end } = program

    const startTime = new Date(start * 1e3)
    const endTime = new Date(end * 1e3)
    const service = new HistoricalData({ startTime, endTime, interval, product })
    const data = await service.getData()
    console.log(data)
}

const auth = {
    apiKey: config.get('COINBASE_PRO_API_KEY'),
    apiSecret: config.get('COINBASE_PRO_API_SECRET'),
    passphrase: config.get('COINVASE_PRO_API_PASSPHRASE'),
    useSandbox: true
}

// const client = new CoinbasePro(auth)

main()