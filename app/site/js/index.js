import 'd3'
import 'c3/c3.min.css'
import c3 from 'c3'
import {Collector} from '../../data/collector'

function showSpeedChart (timestamps, downloadSpeeds, uploadSpeeds) {
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

function getKey () {
  const url = new URL(window.location.href)
  return url.searchParams.get('key')
}

fetch('/api/v1/datapoints/' + getKey(), {method: 'GET'}).then(async (res) => {
  const items = await res.json()
  const collector = new Collector()
  items.forEach((item) => collector.collect(item.timeStamp, item.upSpeed, item.downSpeed))
  showSpeedChart(collector.times, collector.download, collector.upload)
})
