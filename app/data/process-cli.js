const readline = require('readline')
const path = require('path')
const fs = require('fs')
const {Collector} = require('./collector')

function jsVarFromArray (varName, array) {
  return `const ${varName} = [${array.join(', ')}] // eslint-disable-line no-unused-vars`
}

function createVariableFile (collector, outputPath) {
  const content = [
    "'use strict'",
    jsVarFromArray('SPEED_CHART_TIMES', collector.times),
    jsVarFromArray('SPEED_CHART_UPLOAD', collector.upload),
    jsVarFromArray('SPEED_CHART_DOWNLOAD', collector.download)
  ].join('\n') + '\n'
  fs.writeFile(outputPath, content, function (err) {
    if (err) throw err
    console.log(`Written content to ${outputPath}`)
  })
}

const rawDataPath = path.join(__dirname, 'raw.csv')
const outputPath = path.join(__dirname, 'data.js')
const collector = new Collector()

console.log('processing...')

const lineReader = readline.createInterface({
  input: fs.createReadStream(rawDataPath)
})

lineReader.on('line', (line) => {
  const [timeStamp, uploadSpeed, downloadSpeed] = line.split(',')
  if (isNaN(timeStamp) || isNaN(uploadSpeed) || isNaN(downloadSpeed)) return
  collector.collect(timeStamp, uploadSpeed, downloadSpeed)
})

lineReader.on('close', () => createVariableFile(collector, outputPath))
