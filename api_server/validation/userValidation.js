const joi = require("joi");
const getErrMessage = require('../config/joiErrMsg')

// const joiSchema = joi.object(
//     {
//         body:{
//             name:joi.string().min(2).max(10).required()
//                 .messages(errMessage)
//         }
//     }
// )

const name = joi.string().min(2).max(10).required()
    .messages(getErrMessage('用户名'))
const password = joi.string().min(6).max(15).alphanum()
    .required().messages(getErrMessage('密码'))
const email = joi.string().email().messages(getErrMessage('邮箱'))

module.exports.joiSchema_forLogin = {
    body:{
        password,
        email
    }
}
module.exports.joiSchema_forReg = {
    body:{
        name,
        password,
        email
    }
}


// module.exports = (req,res,next)=>{
//     console.log(req.body)
//     const validationResult = joiSchema.validate({name:req.body.name})
//     console.log(validationResult.error)
//     // next()
// }
