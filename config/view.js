const { resourcePath } = require('@horsepower/server')

module.exports = {
  path: resourcePath('views'),
  minifier: {
    removeOptionalTags: false
  }
}