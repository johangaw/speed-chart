const fs = require('fs')
const path = require('path')
const speedTest = require('speedtest-net')
const minimist = require('minimist')
const sendData = require('./upload').sendData
const {TIMES} = require('../config/node-config')

const argv = minimist(process.argv.slice(2), {default: {intervall: 1}})
const min2ms = (minute) => minute * 60 * 1000
const key = argv.key

runTest(key)
setInterval(runTest, min2ms(argv.intervall), key)

function runTest (key) {
  console.log('test started...')
  return new Promise((resolve, reject) => {
    const test = speedTest({ maxTime: TIMES.FIVE_SECONDS })
    test.on('data', data => {
      const timeStamp = new Date()
      Promise.all([
        saveData(timeStamp, data.speeds.upload, data.speeds.download),
        sendData(key, timeStamp, data.speeds.upload, data.speeds.download)
      ]).then((results) => resolve(results))
    })
    test.on('error', err => {
      reject(err)
    })
  }).then((data) => console.log('success: ' + data), (err) => console.log('error: ' + err))
}

function saveData (timeStamp, upSpeed, downSpeed) {
  const dataFile = path.join(__dirname, '..', 'data', 'raw.csv')
  const prefix = fs.existsSync(dataFile) ? '' : 'Time,Upload speed,Download speed\n'
  const line = `${prefix}${timeStamp.getTime()},${upSpeed},${downSpeed}\n`
  return new Promise((resolve, reject) => {
    fs.appendFile(dataFile, line, function (err) {
      if (err) throw err
      resolve()
    })
  })
}
