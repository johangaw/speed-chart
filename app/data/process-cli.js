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

function createCSVWithLocalDates (collector, outputPath) {
  fs.writeFileSync(outputPath, 'Time\tUpload speed\tDownload speed\n')
  collector.times.forEach((time, index) => {
    fs.appendFileSync(outputPath, `${time.toLocaleString()}\t${collector.upload[index]}\t${collector.download[index]}\n`)
  })
}

const rawDataPath = path.join(__dirname, 'raw.csv')
const outputPath = path.join(__dirname, 'data.js')
const outputPathCSV = path.join(__dirname, 'data.csv')
const collector = new Collector()

console.log('processing...')

const lineReader = readline.createInterface({
  input: fs.createReadStream(rawDataPath)
})

lineReader.on('line', (line) => {
  const [timeStamp, uploadSpeed, downloadSpeed] = line.split(',')
  if (isNaN(timeStamp) || isNaN(uploadSpeed) || isNaN(downloadSpeed)) return
  collector.collect(Number(timeStamp), Number(uploadSpeed), Number(downloadSpeed))
})

lineReader.on('close', () => {
  createVariableFile(collector, outputPath)
  createCSVWithLocalDates(collector, outputPathCSV)
})
