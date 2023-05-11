//引入joi模块
const Joi = require('joi');
//修改和注册验证
const schemaRegisterUpdate = Joi.object({
    username: Joi.string().min(5).max(100).required().error(new Error('The format of the user name is incorrect')),
    password: Joi.string().min(8).max(20).required().error(new Error('The password format is incorrect')),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().error(new Error('The mailbox format is incorrect'))
});
//登录验证
const schemaLogin=Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().error(new Error('The mailbox format is incorrect')),
    password: Joi.string().min(8).max(20).required().error(new Error('The password format is incorrect')),
});

module.exports={
    schemaRegisterUpdate,
    schemaLogin
}