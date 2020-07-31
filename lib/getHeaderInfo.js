const rules = require('./rules')

function getFileHeadInfo(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)

    reader.addEventListener('loadend', function _loadend() {
      const content = reader.result

      let _headerInfo = ''
  
      for(let i = 0, len = rules.length; i < len; i++) {
        let { _length, header_info, type } = rules[i]

        _headerInfo = new Uint8Array(content).slice(0, _length)

        const newArray = []
  
        _headerInfo.forEach(item => {
          let val = item.toString(16).length === 1 ? '0' + item.toString(16) : item.toString(16)
          newArray.push(val.toUpperCase())
        })

        if(newArray.join(' ') === header_info) {
          resolve({
            name: file.name,
            type
          })
        }
        
      }
      resolve({
        name: file.name,
        msg:'未查询到相关文件信息'
      })
    })
    reader.addEventListener('error', function _error(err) {
      reject(err)
    })
  })
}

module.exports = {
  getFileHeadInfo
}
