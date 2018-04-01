const MongoClient = require('mongodb').MongoClient
const CONFIG = require('../config/node-config').DATABASE

function insertDatapoint (timeStamp, upSpeed, downSpeed) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(CONFIG.URL, (err, client) => {
      if (err) reject(new Error('Could not connect to database: ' + err))
      const collection = client.db(CONFIG.NAME).collection(CONFIG.COLLECTIONS.DATAPOINTS)
      collection.insert({timeStamp, upSpeed, downSpeed}, (err, result) => {
        if (err) reject(new Error('Could not insert: ' + err))
        client.close()
        resolve()
      })
    })
  })
}

function getAllDatapoints () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(CONFIG.URL, (err, client) => {
      if (err) reject(new Error('Could not connect to database: ' + err))
      const collection = client.db(CONFIG.NAME).collection(CONFIG.COLLECTIONS.DATAPOINTS)
      collection.find({}).toArray((err, items) => {
        if (err) reject(new Error('Could not get all: ' + err))
        client.close()
        resolve(items)
      })
    })
  })
}

module.exports = {insertDatapoint, getAllDatapoints}
