const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');

const app = new Koa();
const router = new KoaRouter();

app.use(koaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

router.get('/users', async ctx => {
    // 设置当前非同源的请求跨域共享该资源
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:7777') // 允许指定域名访问
    ctx.set('Access-Control-Allow-Origin', '*') // 允许所有域名访问

    // ctx.body = '请求成功！'
    ctx.body = [
        {id:1,name: 'zy'},
        {id:2,name:'zy-1'}
    ]
})

router.post('/users', koaBody({
    multipart: true
}), async ctx => {
    // 允许所有域名访问
    ctx.set('Access-Control-Allow-Origin', '*');
    console.log('reqData', ctx.request.body)
    ctx.body = '添加成功'
})

// 预检请求
router.options('/users', async ctx => {
    console.log('发生了预检请求')
    // 允许所有域名访问    
    ctx.set('Access-Control-Allow-Origin', '*') 
    // 还需要返回一些头信息，告诉他实际请求是否允许通过
    ctx.set('Access-Control-Allow-Headers', 'Content-Type')
    ctx.set('Access-Control-Allow-Methods', 'PUT');
    ctx.body = '允许通过请求'
})

router.put('/users', koaBody({
    multipart: true
}), async ctx => {
    // 先经过预检请求，再发生该请求
    ctx.set('Access-Control-Allow-Origin', '*');
    console.log('reqData', ctx.request.body)
    ctx.body = '添加成功'
})

app.use(router.routes());
app.listen(8888);