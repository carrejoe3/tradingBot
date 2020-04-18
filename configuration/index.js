const config = require('../config.json')

exports.get = (key) => process.ev[key] || config[key]