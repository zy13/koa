const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaBody = require('koa-body')
const koaStaticCache = require('koa-static-cache')

const app = new Koa()
const router = new KoaRouter()

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

router.post('/upload', koaBody({
  multipart: true, // 解析form-data格式数据，
  formidable: { // 解析form-data的二进制数据
    uploadDir: './public/upload',
    keepExtensions: true
  }
}), async ctx => {
  let {attachment } = ctx.request.files
  // console.log(ctx.request.body) // 存放对象
  // console.log(ctx.request.files) // 存放文件
  ctx.body = '/' + attachment.path
})

app.use(router.routes())
app.listen(8888)