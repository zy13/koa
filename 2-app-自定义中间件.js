const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

const quotes = [
  '虽然我个子矮，但我发际线高啊！',
  '有些事情做不完，就留到明天做吧。运气好的话，明天死了就不用做了。',  
  '善良没用，你得漂亮。',  
  '好好活下去 每天都有新打击。',  
  '活着的时候把自己搞得好看一点，这样你就不会死得太难看。',  
  '世上无难事 只要肯放弃。',  
  '加油，你是最胖的！' 
]

// 一个中间件处理一个业务

// 中间件1-处理静态资源
app.use(async(ctx, next) => {
  if(ctx.url.startsWith('/public')) {
    ctx.body = fs.readFileSync(`.${ctx.url}`).toString()
  } else {
    await next()
  }
})

// 中间件2-处理动态资源
app.use(async(ctx, next) => {
  if(ctx.url === '/quote') {
    ctx.body = quotes[Math.floor(Math.random()*quotes.length)]
  } else {
    await next()
  }
})

app.use(async(ctx,next) => {
  ctx.body = 'hello'
  await next()
})

app.listen(8888)