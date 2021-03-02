## 关于CORS

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS

把跨域请求的场景分为：
- **简单请求**
  - 如果通过则直接返回资源
- **非简单请求**
  - 首选有一个预检过程
  - 预检通过，再返回资源