const fetch = require('node-fetch')
const API = require('../config/node-config').API

function sendData (key, timeStamp, upSpeed, downSpeed) {
  const url = `${API.URL}/api/v1/datapoint`
  return fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({key, timeStamp, upSpeed, downSpeed})
  }).then(response => {
    if (response.ok) return response.json()
    console.error('Could not send data')
    throw response.json()
  })
}

module.exports.sendData = sendData
