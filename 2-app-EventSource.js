const Koa = require('koa')
const KoaRouter = require('koa-router')
const koaStaticCache = require('koa-static-cache')
const koaBody = require('koa-body')

const app = new Koa()
const router = new KoaRouter()
const users = [
  {id:1,username:'zy-1'},
  {id:2,username:'zy-2'}
]
let maxId = 3

app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  gzip: true,
  dynamic: true
}))

async function sleep(t = 1000) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, t);
  })
}

router.get('/users', koaBody(), async ctx => {
  let { count } = ctx.request.query;
  count = count || 0

  // 比较当前count和后端数据当前的长度
  while(count == users.length) { // 数据没变
    // 定时查询
    await sleep() // time: pending
  }

  // 长轮询-标准化: EventSource
  ctx.set('content-type', 'text/event-stream')
  return new Promise(resolve => {
    setTimeout(() => {
      // ping值可以修改
      ctx.body = `event:ping\ndata:{"users":${JSON.stringify(users)}}\n\n`
      resolve()
    }, 2000);
  })  
})

router.post('/users', koaBody(), async ctx => {
  console.log(ctx.request.body)
  let { username } = ctx.request.body
  users.push({
    id: maxId++,
    username
  })
  ctx.body='添加成功'
})

app.use(router.routes())
app.listen(8888)