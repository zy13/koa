const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaStatic = require('koa-static-cache')
const koaBody = require('koa-body')
const jsonwebtoken = require('jsonwebtoken')
const koaJwt = require('koa-jwt')

const app = new Koa()
const router = new KoaRouter()
const key = 'kkb'

app.use(koaStatic({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

app.use(koaJwt({
  secret: key
}).unless({path: [/^\/api\/login/]}))

router.post('/api/login', async ctx => {
  const user = {
    username: 'zy',
    uid: 1
  }
  const tokenString = jsonwebtoken.sign(user, key)
  ctx.set('Authorization', tokenString)
  ctx.body = '登录成功！'
})

router.get('/api/user', async ctx => {
  ctx.body = '获取数据成功!'
})

app.use(router.routes())
app.listen(8888)