// 验证用户是否登录
module.exports = async (ctx, next) => {
  if(ctx.state.user.id) {
    await next()
  }else{
    ctx.body = '没有权限'
  }
}