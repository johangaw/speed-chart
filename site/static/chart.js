'use strict'

//  eslint-disable-next-line no-unused-vars
function showSpeedChart (c3, timestamps, downloadSpeeds, uploadSpeeds) {
  function formatDate (date) {
    var mm = date.getMonth() + 1 // getMonth() is zero-based
    var dd = date.getDate()
    const zeroPadded = (number) => (number > 9 ? '' : '0') + number

    const dateSting = [date.getFullYear(), mm, dd].map(zeroPadded).join('-')
    const timeSting = [date.getHours(), date.getMinutes(), date.getSeconds()].map(zeroPadded).join(':')

    return dateSting + ' ' + timeSting
  }

  c3.generate({
    data: {
      x: 'x',
      columns: [
        ['x'].concat(timestamps),
        ['download speed'].concat(downloadSpeeds),
        ['upload speed'].concat(uploadSpeeds)
      ]
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%d/%m'
        }
      },
      y: {
        label: 'Mb/s'
      }
    },
    tooltip: {
      format: {
        title: (date) => formatDate(date)
      }
    }
  })
}
