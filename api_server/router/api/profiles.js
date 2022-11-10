const express =require('express')
const Profile = require('../../models/Profile')
const profilesRouter = express.Router()

const secret = require('../../config/Keys').secretOrKey
const expressJwt = require('express-jwt').expressjwt({secret,algorithms:['HS256']})

const joiSchema = require('../../validation/profileValidation')
const expressJoi = require('@escook/express-joi')

profilesRouter.get('/test',(req, res) => {
    res.send({msg:'Profile work'})
})

// router: POST api/profile/add
// 功能: 添加信息接口
// 权限: 私有
profilesRouter.post('/add',expressJwt,expressJoi(joiSchema.profile_add),(req, res) => {
    const profile = {}
    if(req.body.type) profile.type = req.body.type
    if(req.body.describe) profile.describe = req.body.describe
    profile.income = req.body.income
    profile.expend = req.body.expend
    profile.cash = req.body.cash
    profile.remark = req.body.remark

    new Profile(profile).save().then(value => {
        res.json({msg:'添加成功',profile})
    },reason => {
        res.json({msg:'添加失败'})
    })
})

// router: GET api/profile
// 功能: 获取所有信息
// 权限: 私有
profilesRouter.get('/',expressJwt,(req,res)=>{
    Profile.find().then(value => {
        if(!value){
            return res.json('没有相关信息')
        }
        res.json({msg:'查询成功',data:value})
    },reason => {
        return res.status(500).json('查询信息失败')
    })
})

// router: GET api/profile/:id
// 功能: 获取指定id信息
// 权限: 私有
profilesRouter.get('/:id',expressJwt,(req,res)=>{
    Profile.findOne({_id:req.params.id}).then(value => {
        if(!value){
            return res.json('没有相关信息')
        }
        res.json({msg:'查询成功',data:value})
    },reason => {
        return res.status(500).json('查询信息失败')
    })
})


// router: POST api/profile/edit/:id
// 功能: 编辑信息接口
// 权限: 私有
profilesRouter.post('/edit/:id',expressJwt,expressJoi(joiSchema.profile_add),(req, res) => {
    const profile = {}
    if(req.body.type) profile.type = req.body.type
    if(req.body.describe) profile.describe = req.body.describe
    profile.income = req.body.income
    profile.expend = req.body.expend
    profile.cash = req.body.cash
    profile.remark = req.body.remark

    Profile.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profile},
        {new:true}
    ).then(value=>{
        res.json({'msg':'信息已修改',data:value})
    },reason=>{
        res.status(500).json({'msg':'修改失败',reason})
    })
})

// router: POST api/profile/delete/:id
// 功能: 删除信息接口
// 权限: 私有
profilesRouter.delete('/delete/:id',expressJwt,(req,res)=>{
    Profile.findOneAndRemove({
        _id:req.params.id
    }).then(value => {
        res.json({msg:'指定信息已删除'})
    },reason => {
        res.status(500).json({msg:'删除失败'})
    })
})


module.exports = profilesRouter
