// node向服务器发送请求
const http = require('http');

(async () => {
  let rs = await httpRequest({
    method: 'get',
    hostname: 'localhost',
    port: '6666',
    path: '/users'
  })
  console.log(rs)
})()

function httpRequest(options) {
  return new Promise((resolve) => {
    let req = http.request(
      options,
      res => {
        let data = ''
        res.on('data', chunk => {
          data+=chunk.toString()
        })
        res.on('end', () =>{
          resolve(data)
        })
      }
    )
    req.write('')
    req.end()
  })
}