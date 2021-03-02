const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaStaticCache = require('koa-static-cache')
const jwt = require('jsonwebtoken')

const app = new Koa()
const router = new KoaRouter()

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

// koa-jwt
app.use(async (ctx,next) => {
  // 排除不需要验证的url
  if(ctx.url.startsWith('/login')) {
    await next()
  } else {
    let token = ctx.get('Authorization')
    try {
      ctx.state.user = jwt.verify(token, 'kkb')
    } catch (e) {
      ctx.throw(400)
    }
    await next()
  }
})

router.get('/users', async ctx => {
  console.log(ctx.state.user)
  ctx.body = [
    {id: 1, name: 'zy'}
  ]
})

router.post('/login', async ctx => {
  // 验证用户是否登录成功，成功则返回用户信息
  let loginUser = {
    id: 1,
    name: 'zy'
  }
  let tokenString = jwt.sign(loginUser, 'kkb')
  ctx.set('Authorization', tokenString)
  ctx.body = '登录成功！'
})

app.use(router.routes())
app.listen(8888)