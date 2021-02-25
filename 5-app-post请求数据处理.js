const Koa = require('koa')
const koaStaticCache = require('koa-static-cache')
const KoaRouter = require('koa-router')
const koaBody = require('koa-body')
const koaNunjucks = require('./middlewares/koa-nunjucks')
const koaConnection = require('./middlewares/koa-connection')

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

// 数据量比较大的请求，使用post提交数据
router.post('/comment', koaBody(), async ctx => {
  // 默认情况下，koa不会解析post提交的正文请求中的数据，其解析头部和url的信息
  let { content, detailId } = ctx.request.body
  let [rs] = await ctx.connection.query(
    'insert into comments (content,datatime,detail_id) values (?,?,?)',
    [content,Date.now(),detailId]
  )
  ctx.body = '评论成功'
})

app.use(router.routes())
app.listen(8888)