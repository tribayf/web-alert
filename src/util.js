'use strict'

module.exports.parseBool = function parseBool(str)
{
  return str.toLowerCase() == 'true'
}

module.exports.timeout = function timeout(ms) {
  // credit: https://stackoverflow.com/a/33292732
  return new Promise(resolve => setTimeout(resolve, ms))
}