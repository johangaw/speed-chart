const fs = require('fs')
const path = require('path')
const speedTest = require('speedtest-net')
const minimist = require('minimist')

const TIMES = {
  TEN_MINUTES: 10 * 60 * 1000,
  ONE_MINUTE: 60 * 1000,
  TEN_SECONDS: 10 * 1000,
  FIVE_SECONDS: 5 * 1000
}

const argv = minimist(process.argv.slice(2), {default: {intervall: 1}})
const min2ms = (minute) => minute * 60 * 1000

runTest()
setInterval(runTest, min2ms(argv.intervall))

function runTest () {
  console.log('running...')
  return new Promise((resolve, reject) => {
    const test = speedTest({ maxTime: TIMES.FIVE_SECONDS })
    test.on('data', data => {
      resolve(saveData(data.speeds.upload, data.speeds.download))
    })
    test.on('error', err => {
      reject(err)
    })
  })
}

function saveData (upSpeed, downSpeed) {
  const now = new Date()
  const dataFile = path.join(__dirname, '..', 'data', 'raw.csv')
  const prefix = fs.existsSync(dataFile) ? '' : 'Time,Upload speed,Download speed\n'
  const line = `${prefix}${now.getTime()},${upSpeed},${downSpeed}\n`
  return new Promise((resolve, reject) => {
    fs.appendFile(dataFile, line, function (err) {
      if (err) throw err
      resolve()
    })
  })
}
