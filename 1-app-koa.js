// Koa => node_modules/koa/lib/application.js => class Application
const Koa = require('koa')

// 初始化一个Application对象
const app = new Koa()


// 中间件，返回的是一个异步函数
app.use(async (ctx, next) => {
  // 鉴权
  console.log(111)
  await next()
  console.log(2222)
  ctx.body = 'hello'
})

app.use(() => {
  return new Promise(resolve=>{
    setTimeout(() => {
      console.log('aaaa')
      resolve()
    }, 1000);
  })
})

// 监听指定端口 => 间接创建了一个http.Server并调用listen方法
app.listen(8888)


// 关于compose => middleware[fn1, fn2, fn3]

// Promise.resolve(fn1).then(fn2).then(fn3) 的逻辑：
// fn1执行完后自动执行then后的fn2然后再执行then后面的fn3,
// 这么做是没有办法控制fn的执行的，如果fn1中执行完成了任务，返现不需要，不允许继续向后执行，那么就会有问题。

// Promise.resolve(fn1(fn2(fn3)))的逻辑：
// 执行fn1,然后下一个任务不是自动执行，它会在fn1的内部逻辑中选择性的执行fn2
// 这样做有利于流程控制: 例如用户鉴权