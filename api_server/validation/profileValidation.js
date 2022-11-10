const joi = require("joi");
const getErrMessage = require('../config/joiErrMsg')

const type = joi.string()
const describe = joi.string()
const income = joi.string().required().messages(getErrMessage('income'))
const expend = joi.string().required().messages(getErrMessage('expend'))
const cash = joi.string().required().messages(getErrMessage('cash'))

module.exports.profile_add = {
    body:{
        type,describe,income,expend,cash
    }
}
