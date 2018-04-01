class Collector {
  constructor () {
    this.times = []
    this.upload = []
    this.download = []
  }

  collect (timeStamp, uploadSpeed, downloadSpeed) {
    this.times.push(new Date(timeStamp))
    this.upload.push(Number(uploadSpeed))
    this.download.push(Number(downloadSpeed))
  }
}

module.exports = {Collector}
