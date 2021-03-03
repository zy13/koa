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

## 练习

### 相册实现区分用户上传的照片功能

- 1、A用户上传的话，只会看到 A用户上传的照片

  - 用户数据可以在 users 表内写死

- 2、使用 jwt 实现相册的鉴权处理逻辑

- 3、实现登录接口 /login（post形式）
```
1. 数据库内创建 users 表: 1. username 字段 2. password 字段
2. 验证账号密码 1.用户数据可以在 users 表内写死
3. 登录成功后，返回token给前端
```

- 4、/getPhotos 接口增加鉴权
```
1、检测 token，如果没有 token 的话，返回 401
2、有 token 并且验证成功的话，在返回对应的数据
```

- 5、jwt 使用 koa-jwt 以及 jsonwebtoken 两个库来实现

- 6、前端使用 ajax 请求登录接口
