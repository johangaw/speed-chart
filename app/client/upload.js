const fetch = require('node-fetch')
const API_URL = process.env.API_URL || 'http://localhost:3000'

function sendData (timeStamp, upSpeed, downSpeed) {
  const url = `${API_URL}/api/v1/datapoint`
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({timeStamp, upSpeed, downSpeed})
  }).then(response => {
    if (response.ok) return response.json()
    console.error('Could not send data')
    throw response.json()
  })
}

module.exports.sendData = sendData
