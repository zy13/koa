const mysql = require('mysql2/promise')

const config = {
  host: 'localhost',
  user: 'root',
  database: 'kkb',
  port: 3307
}
let connection
module.exports = () => {
  return async (ctx, next) => {
    if(!connection) {
      connection = await mysql.createConnection(config)
    }
    ctx.connection = connection
    await next()
  }
}