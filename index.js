const config = require('./config.js')
const { Client } = require('discord.js')
const client = new Client()
const inst = require('./run')
const instance = new inst(client, {
  status: config.status,
  bot: config.bot,
  botOwners: config.botOwners,
  testServers: config.testServers, 
  prefix: config.prefix,
  mongoSettings: config.mongoSettings,
  showWarns: config.showWarns,
  ignoreBots: config.ignoreBots
})

module.exports = instance
client.login('ODQ3MTk4OTU3NDY5ODI3MTAy.YK6lgw.RZyRqDFpFQdIGQQnL2uzxq3m-8g');