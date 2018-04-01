const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const {insertDatapoint, getAllDatapoints} = require('./databse')
const PRODUCTION = require('../config/node-config').PRODUCTION

const app = express()

if (PRODUCTION) {
  app.use('/', express.static(path.join(__dirname, '..', 'dist')))
}

app.use(bodyParser.json())

app.post('/api/v1/datapoint', (req, res) => {
  const {timeStamp, upSpeed, downSpeed} = req.body
  insertDatapoint(timeStamp, upSpeed, downSpeed)
    .then(() => res.status(201).json({success: true}), (err) => res.status(500).json({success: false, error: err}))
})

app.get('/api/v1/datapoint', (req, res) => {
  getAllDatapoints().then((datapoints) => {
    res.status(200).json(datapoints)
  }, (err) => {
    res.status(500).json({success: false, error: err})
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
