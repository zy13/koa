const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaBody = require('koa-body')
const koaStaticCache = require('koa-static-cache')
const koaConnection = require('./middleware/koa-connection')

const app = new Koa()
const router = new KoaRouter()

app.use(koaConnection)

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

router.get('/getPhotos', async ctx => {
  let [photos] = await ctx.connection.query(
    'select * from photos'
  )
  // console.log(photos)
  ctx.body = photos
})

router.post('/upload', koaBody({
  multipart: true, // 解析form-data格式数据，
  formidable: { // 解析form-data的二进制数据
    uploadDir: './public/static/upload',
    keepExtensions: true
  }
}), async ctx => {
  let { name:filename, size, path, type } = ctx.request.files.attachment
  await ctx.connection.query(
    'insert into photos (filename, size, path, type) values (?,?,?,?)',
    [filename, size, path, type]
  )
  ctx.body = '/' + path
})

router.post('/userInfo',koaBody(), async ctx => {
  let { username, gender } = ctx.request.body
  console.log(ctx.request.body)
  ctx.body = '数据提交成功'
})

app.use(router.routes())
app.listen(8888)