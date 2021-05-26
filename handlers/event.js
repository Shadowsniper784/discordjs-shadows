const getAllFiles = require('./getallfiles.js')
const Events = require('./enums/Events.js')
const path = require('path')
const fs = require("fs")
const waitingForDB = {
  func,
  client,
  instance,
  isEnabled
} = []
class FeatureHandler {
  constructor(client, instance, dir) {
      const _feature = new Map() // <Feature name, Disabled GuildIDs>
  const _client = client
  const _instance = instance
    this._client = client
    this._instance = instance
    register()
    async function register() {
      // Register built in features
      for (const [file, fileName] of getAllFiles(
        `${instance.dir}/${instance.featuresDir}`
      )) {
        
        registerFeature(await import(file), fileName, instance)
      }
    }

    if (!dir) {
      return
    }

    if (!fs.existsSync(dir)) {
      throw new Error(`Listeners directory "${dir}" doesn't exist!`)
    }

    const files = getAllFiles(dir)

    const amount = files.length
    this._instance.amount = amount
    if (amount === 0) {
      return
    }

    console.log(
      `Shadow Commands > Loaded ${amount} listener${amount === 1 ? '' : 's'}.`
    )
    ;(async () => {
      for (const [file, fileName] of files) {
        registerFeature(await import(file), fileName, instance)
      }

      instance.on(Events.DATABASE_CONNECTED, (connection, state) => {
        if (state === 'Connected') {
          for (const { func, client, instance, isEnabled } of waitingForDB) {
            func(client, instance, isEnabled)
          }
        }
      })
    })
     function registerFeature(file, fileName, instance) {
    const { default: func, config } = file
    let testOnly = false
    

    if (config) {
      const { displayName, dbName } = config
      if (config.testOnly) {
        testOnly = true
      }

      const missing = []
      if (!displayName) missing.push('displayName')
      if (!dbName) missing.push('dbName')

      if (missing.length && instance.showWarns) {
        console.warn(
          `Shadow Commands > Feature "${fileName}" has a config file that doesn't contain the following properties: ${missing}`
        )
      }
    } else if (instance.showWarns) {
      console.warn(
        `Shadow Commands > Feature "${fileName}" does not export a config object.`
      )
    }

    if (typeof func !== 'function') {
      return
    }

    const isEnabled = (guildId) => {
      if (testOnly && !instance.testServers.includes(guildId)) {
        return false
      }

      return this.isEnabled(guildId, file)
    }

    if (config && config.loadDBFirst === true) {
      waitingForDB.push({
        func,
        client: this._client,
        instance: this._instance,
        isEnabled,
      })
      return
    }

    func(instance.client, instance, isEnabled)
  }
  const isEnabled = (guildId, feature) => {
    return this._features.get(feature).includes(guildId)
  }
} getAmount() {
  return this._amount
}
}
module.exports = FeatureHandler