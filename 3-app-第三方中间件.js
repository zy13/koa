const Koa = require('koa')
const koaStaticCache = require('koa-static-cache')
const KoaRouter = require('koa-router')

const app = new Koa()
const router = new KoaRouter()

// 一个中间件处理一个业务

// 中间件1-处理静态资源
// app.use(async(ctx, next) => {
//   if(ctx.url.startsWith('/public')) {
//     ctx.body = fs.readFileSync(`.${ctx.url}`).toString()
//   } else {
//     await next()
//   }
// })
app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  dynamic: true,
  gzip: true
}))

// 中间件2-处理动态资源
// app.use(async(ctx, next) => {
//   if(ctx.url === '/quote') {
//     ctx.body = quotes[Math.floor(Math.random()*quotes.length)]
//   } else {
//     await next()
//   }
// })
// app.use(async(ctx,next) => {
//   ctx.body = 'hello'
//   await next()
// })
router.get('/register', async ctx=> {
  ctx.body = '注册'
})
router.get('/login', async ctx=> {
  ctx.body = '登录'
})


// 为router去根据不同的url和请求方法（get、post）去注册不同的函数
app.use(router.routes())
app.listen(8888)