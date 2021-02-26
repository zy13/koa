const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaStaticCache = require('koa-static-cache')
const koaBody = require('koa-body')
const koaConnection = require('./middlewares/koa-connection')
const koaNunjucks = require('./middlewares/koa-nunjucks')

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

router.get('/upload', async ctx => {
  const [attachments] = await ctx.connection.query(
    'select * from attachments'
  )
  console.log(attachments)
  ctx.render('upload',{
    attachments
  })
})

router.post('/upload', koaBody({
  multipart: true,
  formidable: {
    uploadDir: './public/attachments',
    keepExtensions: true
  }
}), async ctx => {
  const { name:filename,type,size,path } = ctx.request.files.avatar
  console.log(ctx.request.files.avatar)
  await ctx.connection.query(
    'insert into attachments (filename,type,size,path) values (?,?,?,?)',
    [filename,type,size,path]
  )
  ctx.redirect('/upload')
})

app.use(router.routes())
app.listen(8888)