const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const {insertDatapoint, getDatapoints} = require('./databse')
const {PRODUCTION, PROJECT_ROOT, API} = require('../config/node-config')

const app = express()

if (PRODUCTION) {
  app.use('/', express.static(path.join(PROJECT_ROOT, 'dist')))
}

app.use(bodyParser.json())

app.post('/api/v1/datapoint', (req, res) => {
  const {key, timeStamp, upSpeed, downSpeed} = req.body
  insertDatapoint(key, timeStamp, upSpeed, downSpeed)
    .then(
      () => res.status(201).json({success: true}),
      (err) => res.status(500).json({success: false, error: err})
    )
})

app.get('/api/v1/datapoints/:key', (req, res) => {
  getDatapoints({key: req.params.key}).then(
    (datapoints) => res.status(200).json(datapoints),
    (err) => res.status(500).json({success: false, error: err})
  )
})

app.listen(API.PORT, () => console.log(`Up and running on port ${API.PORT}!`))
