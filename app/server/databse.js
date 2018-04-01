const MongoClient = require('mongodb').MongoClient
const CONFIG = require('../config/node-config').DATABASE

function insertDatapoint (timeStamp, upSpeed, downSpeed) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(CONFIG.URL, function (err, client) {
      if (err) reject(new Error('Could not connect to database: ' + err))
      const collection = client.db(CONFIG.NAME).collection(CONFIG.COLLECTIONS.DATAPOINTS)
      collection.insert({timeStamp, upSpeed, downSpeed}, (err, result) => {
        if (err) reject(new Error('Could not insert: ' + err))
        resolve()
      })
    })
  })
}

module.exports.insertDatapoint = insertDatapoint
