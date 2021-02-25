const mysql = require('mysql2/promise')

const config = {
  host: 'localhost',
  user: 'root',
  database: 'kkb',
  port: 3307
}

module.exports = () => {
  return async (ctx, next) => {
    if(!ctx.connection) {
      ctx.connection = await mysql.createConnection(config)
    }
    await next()
  }
}