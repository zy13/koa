const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const http = require('http')

const app = new Koa();
const router = new KoaRouter();

app.use(koaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

router.get('/users', async ctx => {
    let rs = await httpRequest({
        hostname: 'localhost',
        port: 6666,
        path: '/users'
    })
    
    console.log(11, rs)
    ctx.body = rs
})

function httpRequest(options) {
    return new Promise((resolve, reject) => {
        let req = http.request(options, res => {
            let data = ''
            res.on('data', chunk => {
                data+=chunk.toString() 
            })
            res.on('end', () => {
                resolve(data)
            })
        })
        req.write('')
        req.end()
    })
}

app.use(router.routes());
app.listen(9999);