const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const PriceSchema = new Schema({
    base: {
        type: String,
        enum: ['BTC'],
        required: true
    },
    currency: {
        type: String,
        enum: ['USB', 'GBP', 'EUR'],
        required: true
    },
    buy: {
        type: Number,
        required: true
    },
    sell: {
        type: Number,
        required: true
    },
    spot: {
        type: Number,
        required: true
    },
    time: {
        type: Date,
        default: Date.now(),
        index: true,
        required: true
    }
})

const Price = mongoose.model('Price', PriceSchema)

module.exports = Price