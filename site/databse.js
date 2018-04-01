const MongoClient = require('mongodb').MongoClient

const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017'
const DATABASE_NAME = 'speed-chart'
const COLLECTIONS = {
  DATAPOINTS: 'datapoints'
}

function insertDatapoint (timeStamp, upSpeed, downSpeed) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(DATABASE_URL, function (err, client) {
      if (err) reject(new Error('Could not connect to database: ' + err))
      const collection = client.db(DATABASE_NAME).collection(COLLECTIONS.DATAPOINTS)
      collection.insert({timeStamp, upSpeed, downSpeed}, (err, result) => {
        if (err) reject(new Error('Could not insert: ' + err))
        resolve()
      })
    })
  })
}

module.exports.insertDatapoint = insertDatapoint
