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

router.get('/', async ctx => {
  ctx.body = ctx.render('index', {
    title: 'nunjucks模板渲染1'
  })
})

app.use(router.routes())
app.listen(8888)