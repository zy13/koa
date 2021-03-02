## 跨域资源共享CORS

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

把跨域请求的场景分为：
- **简单请求**
  - 如果通过则直接返回资源
```js
get post head 
// 或者
`content-type`为：`text/plain、multipart/form-data、application/x-www-form-urlencoded`
```
- **非简单请求**
  - 首选有一个预检过程
  - 预检通过，再返回资源
```js
PUT
DELETE
CONNECT
OPTIONS
TRACE
PATCH
```

## 服务器代理

- 使用http模块实现简单的服务器代理
- 使用koa-server-http-proxy中间件实现代理

## 基于jwt鉴权

- jsonwebtoken模块