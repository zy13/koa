const nunjucks = require('nunjucks')
const path = require('path')

module.exports = (options) => {
  const viewDir = path.resolve(__dirname, '../views')

  // 配置模板文件-动态数据渲染模板
  nunjucks.configure('views', {
    noCache: true,
    watch: true,
    autoescape: true,
    ...options
  })

  // 返回异步函数
  return async (ctx, next) => {
    if(!ctx.render) {
      ctx.render = (tplName, data) => {        
        // return nunjucks.render(`${viewDir}/${tplName}.html`, {
        //   ...data
        // })
        ctx.body = nunjucks.render(`${viewDir}/${tplName}.html`, {
          ...data,
          user: ctx.state.user// 统一挂载用户信息
        })
      }
    }
    
    await next()
  }
}