const readline = require('readline')
const fs = require('fs')
const path = require('path')

console.log('processing...')
const times = []
const upload = []
const download = []

const RAW_DATA_PATH = path.join(__dirname, 'raw.csv')
const PROCESSED_DATA_PATH = path.join(__dirname, 'data.js')

const lineReader = readline.createInterface({
  input: fs.createReadStream(RAW_DATA_PATH)
})

lineReader.on('line', parseLine)
lineReader.on('close', formatOutput)

function parseLine (line) {
  const [timeStamp, uploadSpeed, downloadSpeed] = line.split(',')
  if (isNaN(timeStamp)) return
  times.push(Number(timeStamp))
  upload.push(Number(uploadSpeed))
  download.push(Number(downloadSpeed))
}

function jsVarFromArray (varName, array) {
  return `const ${varName} = [${array.join(', ')}] // eslint-disable-line no-unused-vars`
}

function formatOutput () {
  const content = [
    "'use strict'",
    jsVarFromArray('SPEED_CHART_TIMES', times),
    jsVarFromArray('SPEED_CHART_UPLOAD', upload),
    jsVarFromArray('SPEED_CHART_DOWNLOAD', download)
  ].join('\n') + '\n'
  fs.writeFile(PROCESSED_DATA_PATH, content, function (err) {
    if (err) throw err
    console.log(`Written content to ${PROCESSED_DATA_PATH}`)
  })
}
