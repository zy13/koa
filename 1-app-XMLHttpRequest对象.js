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

router.post('/user', koaBody(), async ctx => {
  // let { username } = ctx.request.params
  // let { username } = ctx.request.query
  let { username } = ctx.request.body
  if(!username) {
    ctx.throw(400, '用户名不能为空')
  }
  ctx.body = '请求成功！'
})

app.use(router.routes())
app.listen(8888)