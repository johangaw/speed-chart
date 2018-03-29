'use strict'
/* global c3 SPEED_CHART_TIMES SPEED_CHART_UPLOAD SPEED_CHART_DOWNLOAD */

// import c3 from 'c3';

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
      ['x'].concat(SPEED_CHART_TIMES),
      ['download speed'].concat(SPEED_CHART_DOWNLOAD),
      ['upload speed'].concat(SPEED_CHART_UPLOAD)
    ]
  },
  axis: {
    x: {
      type: 'timeseries',
      tick: {
        format: '%Y-%m-%d'
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
