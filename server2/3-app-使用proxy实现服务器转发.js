const Koa = require('koa');
const koaStaticCache = require('koa-static-cache');
const KoaRouter = require('koa-router');
const proxy = require('koa-server-http-proxy')

const app = new Koa();
const router = new KoaRouter();

app.use(koaStaticCache({
    prefix: '/public',
    dir: './public',
    gzip: true,
    dynamic: true
}));

app.use(proxy('/api', {
  target: 'http://localhost:6666',
  pathRewrite: {'^/api': ''}
}))

app.use(router.routes());
app.listen(9999);