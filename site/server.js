const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

if (process.env.PRODUCTION) {
  app.use('/', express.static(path.join(__dirname, '..', 'dist')))
}

app.use(bodyParser.json())

app.get('/api/v1', (req, res) => res.send('Hello World!'))

app.post('/api/v1/datapoint', (req, res) => {
  // const data = req.body
  res.json({success: true})
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
