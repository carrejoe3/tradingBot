const mongoose = require('mongoose')
const config = require('../config/config')

mongoose.Promise = global.Promise

mongoose.set('useCreateIndex', true);

module.exports = {
  connect: () => {
    return new Promise((resolve, reject) => {
      mongoose.connect(`${config.MONGO_URL}/${config.MONGO_DATABASE_NAME}`, {
        promiseLibrary: global.Promise,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      const conn = mongoose.connection
      conn.on('error', err => {
        console.error(err)
        reject()
      })
      conn.once('open', () => {
        console.log(`Connected to ${config.MONGO_URL}/${config.MONGO_DATABASE_NAME}`)
        resolve()
      })
    })
  },
  model: key => { return mongoose.model(key) }
}
