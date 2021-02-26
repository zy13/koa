const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaBody = require('koa-body')
const koaStaticCache = require('koa-static-cache')

const app = new Koa()
const router = new KoaRouter()

const users = [
  {id: 1, name: 'zy-1'},
  {id: 2, name: 'zy-3'},
]

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

router.get('/user', async ctx => {
  ctx.body = users
})

app.use(router.routes())
app.listen(8888)