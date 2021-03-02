const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaBody = require('koa-body')
const koaStaticCache = require('koa-static-cache')
const jwt = require('jsonwebtoken')
const koaJwt = require('koa-jwt')
const koaConnection = require('./middlewares/koa-connection')

const app = new Koa()
const router = new KoaRouter()
const key = 'kkb'

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

app.use(koaConnection())

app.use(koaJwt({
  secret: key
}).unless({path: [/^\/login/]}))

// 登录接口
router.post('/login',koaBody({
  multipart: true
}), async ctx => {
  let { username, password } = ctx.request.body
  let [[user]] = await ctx.connection.query(
    'select * from users where username=? and password=?',
    [username, password]
  )
  if(user) {
    let tokenString = jwt.sign({
      username: user.username,
      uid: user.id
    }, key)
    console.log(tokenString)
    ctx.set('Authorization', tokenString)
    ctx.body = '登录成功'
  } else {
    ctx.throw(400)
  }  
})

// 文件上传
router.post('/upload', koaBody({
  multipart: true,
  formidable: {
    uploadDir: './public/photos',
    keepExtensions: true
  }
}), async ctx => {
  console.log(11, ctx.request.files)
  let { uid } = ctx.state.user
  let { name:filename, size, type, path } = ctx.request.files.photo
  try {
    await ctx.connection.query(
      'insert into photos (filename, size, type, path, uid) values (?,?,?,?,?)',
      [filename, size, type, '/'+path, uid]
    )
    ctx.body = '/' + path
  } catch (e) {
    ctx.throw(500)
  }
})

// 获取照片接口
router.get('/getphotos', async ctx => {
  console.log('user', ctx.state.user)
  let { uid } = ctx.state.user
  let [photos] = await ctx.connection.query(
    'select * from photos where uid=?',
    [uid]
  )
  console.log(photos)
  ctx.body = photos
})

app.use(router.routes())
app.listen(8888)

