const mysql  = require('mysql2/promise')

const config = {
  host: 'localhost',
  database: 'kkb',
  port: 3307,
  user: 'root'
}
let connection

module.exports = () => {
  return async (ctx,next) => {
    if(!connection) {
      connection = await mysql.createConnection(config)
    }
    ctx.connection = connection
    await next()
  }
}