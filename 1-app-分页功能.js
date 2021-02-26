const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaStaticCache = require('koa-static-cache')
const koaBody = require('koa-body')
const koaConnection = require('./middlewares/koa-connection')
const koaNunjucks = require('./middlewares/koa-nunjucks')
const dayjs = require('dayjs')

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

router.get('/', async ctx => {
  const [categories] = await ctx.connection.query(
    'select * from categories'
  )
  const [items] = await ctx.connection.query(
    'select * from items limit 10'
  )
  ctx.body = ctx.render('index', {
    title: '首页',
    categories,
    items
  })
})

router.get('/list/:categoryId', async ctx => {
  const { categoryId } = ctx.request.params
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

router.get('/detail/:detailId', async ctx => {
  const { detailId } = ctx.request.params
  let { page } = ctx.request.query
  page = page ? Number(page) : 1
  const [categories] = await ctx.connection.query(
    'select * from categories'
  )
  const [[item]] = await ctx.connection.query(
    'select * from items where id=?',
    [detailId]
  )

  
  
  let limit = 5
  // 第一页：offset=0；第二页：offset = 5; 
  // 第page页：offset = limit * (page-1)
  let offset = limit * (page-1)
  // 排序：order by 字段1 排序方式，字段2 排序方式
  // 排序方式：desc => 降序, asc => 升序
  // 分页借助：limit offset
  // limit 条数 => 限制查询多少条
  // offset 条数 => 从第几条开始，默认从0
  let [comments] = await ctx.connection.query(
    'select * from comments where detail_id=? order by id desc limit ? offset ?',
    [detailId,limit,offset]
  )

  // 总的页码数
  let pages = 0
  let [[{ count }]] = await ctx.connection.query(
    'select count(*) as count from comments where detail_id=?',
    [detailId]
  )
  pages = Math.ceil( count/limit )

  comments = comments.map(item => {
    return {
      ...item,
      formateDatetime: dayjs(item.datetime).format('YYYY年MM月DD日 HH:mm:ss')
    }
  })
  ctx.body = ctx.render('detail', {
    title: '详情',
    detailId,
    categories,
    item,
    comments,
    pages,
    page
  })
})

router.post('/comment', koaBody(), async ctx => {
  const { content, detailId } = ctx.request.body
  const [categories] = await ctx.connection.query(
    'select * from categories'
  )
  const [rs] = await ctx.connection.query(
    'insert into comments (content, datatime, detail_id) values (?,?,?)',
    [content, Date.now(), detailId]
  )
  ctx.body = ctx.render('message',{
    categories
  })
})

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