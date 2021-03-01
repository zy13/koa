const mysql = require('mysql2/promise')

const config = {
  host: 'localhost',
  port: '3307',
  database: 'kkb',
  user: 'root'
}
let connection

module.exports = async (ctx, next) => {
  if(!connection) {
    connection = await mysql.createConnection(config)
  }
  ctx.connection = connection
  await next()
}