const path = require('path')

const API = {
  URL: process.env.API_URL || 'http://localhost:3000'
}

const DATABASE = {
  URL: process.env.DATABASE_URL || 'mongodb://localhost:27017',
  NAME: 'speed-chart',
  COLLECTIONS: {
    DATAPOINTS: 'datapoints'
  }
}

const PROJECT_ROOT = path.join(__dirname, '..', '..')

const PRODUCTION = process.env.PRODUCTION || false

const TIMES = {
  TEN_MINUTES: 10 * 60 * 1000,
  ONE_MINUTE: 60 * 1000,
  TEN_SECONDS: 10 * 1000,
  FIVE_SECONDS: 5 * 1000,
  ONE_SECOND: 1000
}

module.exports = {DATABASE, PRODUCTION, TIMES, API, PROJECT_ROOT}
