const {AUTH} = require('../config/node-config')

function isAuthenticated (key) {
  return AUTH.ACCEPTED_KEYS.includes(key)
}

module.exports = {isAuthenticated}
