const express = require('express')
const path = require('path')
const app = express()

if (process.env.PRODUCTION) {
  app.use('/', express.static(path.join(__dirname, '..', 'dist')))
}

app.get('/api/v1', (req, res) => res.send('Hello World!'))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
