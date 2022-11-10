const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    type:{
        type:String
    },
    describe:{
        type:String
    },
    income:{
        type:String,
        require:true
    },
    expend:{
        type:String,
        require:true
    },
    cash:{
        type:String,
        require:true
    },
    remark:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    },
},{versionKey:false})  // versionKey设置为false则文档不会添加版本号

module.exports = Profile = mongoose.model('Profile',ProfileSchema);
