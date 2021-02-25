const Koa = require('koa')
const koaStaticCache = require('koa-static-cache')
const KoaRouter = require('koa-router')
const koaNunjucks = require('./middlewares/koa-nunjucks')


const app = new Koa()
const router = new KoaRouter()

// 注册中间件
app.use(koaNunjucks())

// 静态资源代理
app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

// 首页
router.get('/', async ctx => {
  ctx.body = ctx.render('index', {
    title: 'nunjucks模板渲染1'
  })
})

// 列表页
router.get('/list', async ctx => {
  ctx.body = ctx.render('list', {
    title: '列表'
  })
})

app.use(router.routes())
app.listen(8888)