const mongoose = require('mongoose')
const Schema = mongoose.Schema

//创建Schema
const UserSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    avatar:{
        type:String,
    },
    identity:{
        type:String,
        require:true
    },
    data:{
        type:Date,
        default:Date.now()
    },
},{versionKey:false})

module.exports = User = mongoose.model('users',UserSchema);