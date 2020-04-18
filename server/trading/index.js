const Price = require('../models/price')
const moment = require('moment')
const BB = require('technicalindicators').BollingerBands

exports.onPrice = async function(price) {
  const start = moment().subtract(1, 'days').toDate()

  const dayAverage = await Price.getMean({ start })
  const dayMax = await Price.getMax({ start })
  const dayMin = await Price.getMin({ start })
  const dayMedian = await Price.getMedian({ start })

  console.log('')
  console.log(`mean: ${dayAverage}`)
  console.log(`max: ${dayMax}`)
  console.log(`min: ${dayMin}`)
  console.log(`median: ${dayMedian}`)
  console.log(`current: ${price.spot}`)
  console.log('')
}

exports.getBollinger = async function({ start, period = 1, end = Date() } = {}) {
    const prices = await Price.getRange({ start, end })

    const total = prices.length - period

    const input = {
        period: total,
        values: prices,
        stdDev: 2
    }

    const outcome = BB.calculate(input)

    console.log(outcome)

    return outcome
}
