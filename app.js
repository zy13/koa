const Koa = require('koa')
const koaStaticCache = require('koa-static-cache')
const KoaRouter = require('koa-router')
const koaNunjucks = require('./middlewares/koa-nunjucks')
const koaConnection = require('./middlewares/koa-connection')
// const categories = require('./data/categories.json')
// const items = require('./data/items.json')

const app = new Koa()
const router = new KoaRouter()

// 注册nunjucks
app.use(koaNunjucks())
// 连接数据库
app.use(koaConnection())

// 静态资源代理
app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

// 首页
router.get('/', async ctx => {
  const [categories] = await ctx.connection.query(
    'select * from categories'
  )
  const [items] = await ctx.connection.query(
    'select * from items limit 10'
  )
  console.log(categories)
  ctx.body = ctx.render('index', {
    title: '首页',
    categories,
    items
  })
})

// 列表页
router.get('/list', async ctx => {
  const [categories] = await ctx.connection.query(
    'select * from categories'
  )
  const [items] = await ctx.connection.query(
    'select * from items limit 10'
  )
  ctx.body = ctx.render('list', {
    title: '列表',
    categories,
    items
  })
})

app.use(router.routes())
app.listen(8888)