# koa

源码：https://github.com/koajs/koa

### koa框架四大核心对象

- Application对象
- Context对象
- Request对象
- Response对象

## 中间件的编写
手写中间件处理静态资源
```js
// 中间件1-处理静态资源
app.use(async(ctx, next) => {
  if(ctx.url.startsWith('/public')) {
    ctx.body = fs.readFileSync(`.${ctx.url}`).toString()
  } else {
    await next()
  }
})
// use()方法接受的是一个异步函数，返回一个Promise对象
```

## koa-static-cache中间件
静态资源代理
```js
app.use(koaStaticCache({
  prefix: '/public',
  dir: './public',
  dynamic: true,
  gzip: true
}))
```

## koa-router
路由代理
```js
router.get('/register', async ctx=> {
  ctx.body = '注册'
})
router.get('/login', async ctx=> {
  ctx.body = '登录'
})
```

## 练习

### 要求
- 1、使用node.js的第三方模块koa搭建一个webserver项目 
  - 1-1、端口8888 
- 2、访问 http://localhost:8888/public/index.html 返回 public 目录下的 index.html 内容 
  - 2-1、使用 koa-static-cache 进行静态资源处理 
- 3、访问 http://localhost:8888/quote 随机返回一句毒鸡汤 
  - 3-1、使用 koa-router 实现

### 毒鸡汤
```js
const quotes = [
  '虽然我个子矮，但我发际线高啊！',
  '有些事情做不完，就留到明天做吧。运气好的话，明天死了就不用做了。',  
  '善良没用，你得漂亮。',  
  '好好活下去 每天都有新打击。',  
  '活着的时候把自己搞得好看一点，这样你就不会死得太难看。',  
  '世上无难事 只要肯放弃。',  
  '加油，你是最胖的！' 
]
```


