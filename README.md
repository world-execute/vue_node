# 基于Vue+Node.js实现的资金管理后台系统
***
> 特别鸣谢:B站up主-技术小余哥的教程,学习到了很多不足的地方
> 练习项目,教程来源[B站up主-技术小余哥](https://www.bilibili.com/video/BV1R341167Fw)
**修改了部分代码和配置**
- 使用[joi]和[express-joi]进行后端数据的验证
- 使用[cors]中间件解决跨域请求问题
- Token验证使用[express-jwt]中间件
- 书写了全局错误处理中间件
- 更改了部分接口响应返回的状态码
***
# 配置与启动
## 接口服务器的启动
api_server/package.json
```
npm install
npm run start
```
## vue启动开发环境
vue/package.json
```
npm install
npm run start
```
***
# 技术栈
- node.js
    - express
    - jsonwebtoken
    - cors
    - bcryptjs
    - mongoose
- vue
    - vue-cli
    - vueRouter
    - axios
    - vuex
    - elementUI
- mongodb  
- node
