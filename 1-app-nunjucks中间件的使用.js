const Koa = require('koa')
const koaStaticCache = require('koa-static-cache')
const KoaRouter = require('koa-router')
const nunjucks = require('nunjucks')

const app = new Koa()
const router = new KoaRouter()

// 配置模板文件-动态数据渲染模板
nunjucks.configure('views', {
  noCache: true,
  watch: true,
  autoescape: true
})

// 静态资源代理
app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

router.get('/', async ctx => {
  ctx.body = nunjucks.render('index.html', {
    title: 'nunjucks模板渲染'
  })
})

app.use(router.routes())
app.listen(8888)