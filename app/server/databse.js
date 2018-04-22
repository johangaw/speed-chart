const MongoClient = require('mongodb').MongoClient
const CONFIG = require('../config/node-config').DATABASE

function insertDatapoint (key, timeStamp, upSpeed, downSpeed) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(CONFIG.URL, (err, client) => {
      if (err) return reject(new Error(`${err.name}: ${err.message}`))
      const collection = client.db(CONFIG.NAME).collection(CONFIG.COLLECTIONS.DATAPOINTS)
      collection.insert({key, timeStamp, upSpeed, downSpeed}, (err, result) => {
        if (err) return reject(new Error(`${err.name}: ${err.message}`))
        client.close()
        resolve()
      })
    })
  })
}
function getDatapoints (filter) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(CONFIG.URL, (err, client) => {
      if (err) return reject(new Error(`${err.name}: ${err.message}`))
      const collection = client.db(CONFIG.NAME).collection(CONFIG.COLLECTIONS.DATAPOINTS)
      collection.find(filter).toArray((err, items) => {
        if (err) return reject(new Error(`${err.name}: ${err.message}`))
        client.close()
        resolve(items)
      })
    })
  })
}

module.exports = {insertDatapoint, getDatapoints}
