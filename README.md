# koa with mysql
## nunjucks模板引擎的应用

- 服务端引用nunjuck库
  - nunjuck.configure配置
  - nunjuck.render()
  - 二次封装nunjucks，并挂载到ctx.render(tplName, data)：简化代码，便于维护
- 模板文件渲染
  - include引入公共模块：公共头部和尾部
  - extends扩展基础模块
  - block引入有差别的模块
  - 大胡子语法渲染数据

## mysql数据库的应用
- 第三方库mysql2的引入
- 使用单例模式，二次封装mysql，并挂载到ctx.connection
- 连接数据库，创建数据库，创建表格
- 实现数据的查询、增加

## 动态路由
- 客户端发生发送数据的方式：1.url； 2.请求头；3.请求正文
- router.post实现动态路由，并将数据挂载到`ctx.request.params`

## post请求的数据处理
- 客户端
  - 通过form表单的post请求方式提交数据
- koa-body中间件
  koa-body解析post请求的数据，并挂载到`ctx.request.body`
- 将客户端的数据存到数据库中

## 练习
- 1、创建一个数据库kkb 
- 2、在kkb数据库中创建一个表users 
- 3、在users表中添加至少下面两个字段： 
  - 1、id(int)，username(varchar) 
- 4、通过koa、koa-router构建一个webserver，端口8888 
- 5、提供一个get方式接口localhost:8888/register访问注册页面（form表单） 
- 6、提供一个post方式接口localhost:8888/register处理提交的数据，并返回操作结果（注册失败 or 注册成功） 
- 7、提交注册的数据保存到数据库users表中 通过标准：完成以上所有任务及要求，方可通过。