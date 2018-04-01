const fetch = require('node-fetch')

function sendData (timeStamp, upSpeed, downSpeed) {
  const url = 'http://localhost:3000/api/v1'
  fetch(url, {
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

sendData(1000, 1000, 1000)

module.exports.sendData = sendData
