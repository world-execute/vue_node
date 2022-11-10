const express =require('express')
const userRouter = express.Router()
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const {secretOrKey,tokenTime} = require('../../config/Keys')
const expressJwt = require('express-jwt').expressjwt({secret:secretOrKey,algorithms:['HS256']})
const joiSchema = require('../../validation/userValidation')
const expressJoi = require('@escook/express-joi')

// router GET api/user/test
userRouter.get('/test',(req, res) => {
    res.send({
        status:0,
        msg:'测试成功'
    })
})

// router POST api/user/register
userRouter.post('/register',(req, res) => {
    // 查询数据库是否有相同邮箱(用户已经存在)
    User.findOne({email: req.body.email})
        .then(value => {
            if(value){
                return res.status(400).json({email:"邮箱已被注册"})
            }else {
                const avatar = gravatar.url(req.body.email,{s:'200', r:'pg', d:'mm'});

                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    identity:req.body.identity,
                    password:req.body.password
                })

                // 加密密码
                bcrypt.genSalt(10,(err,salt)=>{
                    bcrypt.hash(newUser.password,salt,(err,hash)=>{
                        if(err) throw err;
                        newUser.password = hash
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => res.send(err))
                    })
                })
            }
        })
    // res.send('ok')
})

// router POST api/user/login
userRouter.post('/login',expressJoi(joiSchema.joiSchema_forLogin),(req, res) => {
    const email = req.body.email
    const password = req.body.password
    User.findOne({email})
        .then(value => {
            if(!value){
                return res.status(400).json({msg:'用户不存在'})
            }

            // 密码匹配
            if(bcrypt.compareSync(password,value.password)){
                // res.json({msg:'登陆成功'})
                const payload = {
                    id:value.id,
                    name:value.name,
                    email:value.email,
                    avatar:value.avatar,
                    identity:value.identity
                }

                jwt.sign(payload,secretOrKey,{expiresIn: tokenTime},(err,token)=>{
                    if(err)return res.status(500).json({msg:'Token生成失败'})
                    res.json({
                        success:true,
                        token:'Bearer '+token
                    })
                })
            }else {
                return res.status(400).json({msg:'密码错误'})
            }
        },reason => {
            res.status(500).json({msg:'密码匹配失败'})
        })
})

// router GET api/user/current
// 私密,需要Token,返回用户信息
userRouter.get('/current',expressJwt,(req, res) => {
    // console.log(req.auth)
    res.json({
        msg:'success',
        user:{
            name:req.auth.name,
            email:req.auth.email,
            avatar:req.auth.avatar,
            identity:req.auth.identity
        }
    })
})
module.exports = userRouter
