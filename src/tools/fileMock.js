module.exports = {
  process(src, filename) {
    return 'module.exports = ' + JSON.stringify(filename) + ';'
  },
}
