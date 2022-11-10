const express = require('express')
const app = express()
const mongoose = require('mongoose')
const mongodbURL = require('./config/Keys').mongodbURL
const userRouter = require('./router/api/user')
const profileRouter = require('./router/api/profiles')
const joi = require('joi')
const cors = require('cors')

// 使用cors支持跨域
app.use(cors())

// 解析req.body中表单数据和json数据
app.use(express.json())
app.use(express.urlencoded({extended:false}))

// 连接mongodb数据库
mongoose.connect(mongodbURL)
    .then(()=>{console.log('Mongodb connected')})
    .catch((err)=>{
        console.log(err)})

// 用户模块api路由
app.use('/api/user',userRouter)
// 资产信息api路由
app.use('/api/profile',profileRouter)

// 根目录访问
app.get('/',(req, res) => {
    res.setHeader('Content-Type','text/html;charset=utf8')
    res.send('hello你好')

})

// 错误级别的中间件
app.use((err,req, res, next) =>{
    if(err){
        if(err.message === 'No authorization token was found'){
            return res.status(401).json({msg:'无效的Token或Token已过期'})
        }
        if(err instanceof joi.ValidationError){
            return res.status(406).json({msg:err.message})
        }
        return res.status(500).json({msg:'服务器未知错误',err:err.message})
    }
} )

const port = 5000 || process.env.PORT
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
})