const { getFileHeadInfo } = require('./lib/getHeaderInfo')

async function getFileType(files) {
  return getFileHeadInfo(files)
}

module.exports = {
  getFileType
}
