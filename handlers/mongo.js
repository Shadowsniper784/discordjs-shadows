const mongooe = require('mongoose')


const Events = require('./enums/Events')

const results = {
  0: 'Disconnected',
  1: 'Connected',
  2: 'Connecting',
  3: 'Disconnecting',
}
class MongoDB {
  constructor(mongoPath, instance, dbOptions) {
    this.mongoPath = mongoPath
    this.instance = instance
    this.dbOptions = dbOptions
    const mongo = async () => {
    await mongoose.connect(mongoPath, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    ...dbOptions,
  })

  const { connection } = mongoose
  const state = results[connection.readyState] || 'Unknown'
  instance.ShadowCommand.emit('databaseConnected', connection, state)
  this.state = state
  this.mongoose = mongoose
  
  }}
  getMongoConnection() {
  return this.mongoose.connection
}
}
module.exports = MongoDB