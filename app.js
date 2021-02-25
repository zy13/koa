const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaStaticCache = require('koa-static-cache')
const koaBody = require('koa-body')
const koaConnection = require('./middlewares/koa-connection')
const koaNunjucks = require('./middlewares/koa-nunjucks')

const app = new Koa()
const router = new KoaRouter()

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

app.use(koaNunjucks())
app.use(koaConnection())

router.get('/register', async ctx => {
  const [categories] = await ctx.connection.query(
    'select * from categories'
  )
  ctx.body = ctx.render('register',{
    title: '注册',
    categories
  })
})

router.post('/register', koaBody(), async ctx => {
  const { username, password } = ctx.request.body
  await ctx.connection.query(
    'insert into users (username, password) values (?,?)',
    [username, password]
  )
  ctx.body = '注册成功'
})

app.use(router.routes())
app.listen(8888)