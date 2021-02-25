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
router.get('/list/:categoryId', async ctx => {
  // 因为url在请求过程中再携带一些动态的额外数据，这个数据会影响当前从数据库中查询的结果
  // 客户端发送请求可以发送数据：1.url 2.请求头 3.请求正文
  // koa-router 会在分析当前动态url时候，把/list/1或者/list/2后面:匹配的内容单独解析出来，
  // 然后存放到ctx.request.params.categoryId
  let { categoryId } = ctx.request.params
  const [categories] = await ctx.connection.query(
    'select * from categories'
  )
  const [items] = await ctx.connection.query(
    'select * from items where category_id=?',
    [categoryId]
  )
  ctx.body = ctx.render('list', {
    title: '列表',
    categories,
    items
  })
})

// 详情页
router.get('/detail/:detailId', async ctx => {
  let { detailId } = ctx.request.params
  const [categories] = await ctx.connection.query(
    'select * from categories'
  )
  const [[item]] = await ctx.connection.query(
    'select * from items where id=?',
    [detailId]
  )
  ctx.body = ctx.render('detail',{
    title: '详情页',
    item,
    categories
  })
})

app.use(router.routes())
app.listen(8888)