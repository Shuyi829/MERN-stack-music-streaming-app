const{
    registerModel,
    updateModel,
    findEmailModel,
}=require(process.cwd()+'/models/user');    
const LocalStorage = require('node-localstorage').LocalStorage,
localStorage = new LocalStorage('./scratch');
const ejs=require('ejs');
const fs = require('fs');
const bcrypt=require('bcrypt');
//导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');
const secretKey = 'spotify';
const {schemaRegisterUpdate,schemaLogin}=require(process.cwd()+'/util/joi');
const Joi = require('joi');




//用户注册控制层
const register=async(req,res)=>{
    let postData=req.body;
    try{
        await schemaRegisterUpdate.validateAsync({ email: postData.email,password:postData.password,username:postData.username });
        let results=await findEmailModel(postData.email);
        if(results.length>0){
            res.status(500).json({message:"The current user information has been registered!"});
        }else{
            let salt=await bcrypt.genSalt(15);
            let pass=await bcrypt.hash(postData.password,salt);
            postData.password=pass;
            let bl=await registerModel(postData);
            //判断返回
            if(bl){
                res.status(200).json({message:"Successful registration"});
            }else{
                res.status(500).json({message:"Unknown error occurred. User registration failed!"});
            }
        }    
    }catch(ex){
        res.status(500).json({message:ex.message});
    }
}

//用户登录控制层
const login=async(req,res)=>{
    console.log(req.body.email);
    let postData=req.body;
    try{
        await schemaLogin.validateAsync({ email: postData.email,password:postData.password});
        var result=await findEmailModel(postData.email);
        if(result.length>0){
            var password=postData.password;
            var sjpassword=result[0].password;
            // 验证密码是否相同，第一个参数是传过来的密码，第二个是数据库存的密码
            var isValidate =await bcrypt.compareSync(password, sjpassword);
            if(isValidate){
                result[0].password=password;
                const tokenStr = jwt.sign({ user: result[0] }, secretKey, { expiresIn: '1200s' });
                res.send({
                    status: 200,
                    message: 'Successful Login',
                    token: tokenStr // 要发送给客户端的 token 字符串,
                });
            }else{
                res.send({
                    status: 500,
                    message: 'Password error'            
                });
            }
        }else{
            res.status(500).json({message:"The current user is not registered!"});
        }          
    }catch(ex){
        res.status(500).json({message:ex.message});
    }
}

//用户退出登录控制层
const logout=async(req,res)=>{
    const tokenStr = jwt.sign({ user: req.user}, secretKey, { expiresIn: '1s' });
    res.send({
        status: 200,
        message: 'Successful destroy',
        token: tokenStr
    });
}

//用户信息修改控制层
const update=async(req,res)=>{
    let postData=req.body;
    try{
        await schemaRegisterUpdate.validateAsync({ email: postData.email,password:postData.password,username:postData.username });
        let salt=await bcrypt.genSalt(15);
        let pass=await bcrypt.hash(postData.password,salt);
        postData._id=req.user.user._id;
        postData.password=pass;
        var bl=await updateModel(postData);
        if(bl){
            res.status(200).json({message:"The user information is modified successfully."});
        }else{
            res.status(500).json({message:"An unknown error occurred, and user information failed to be modified"});
        }
    }catch(ex){
        res.status(500).json({message:ex.message});
    }
}


const me=async(req,res)=>{
    const {token}=req.query;
    let verifyToken = jwt.verify(token,secretKey);
    var id=verifyToken.user._id;
    res.status(200).json({
        id:id,
        token:verifyToken
    })
}

const selectToken=async(req,res)=>{
    const {token}=req.query;
    try{
        let verifyToken = jwt.verify(token,secretKey);
        res.status(200).json({message:"success",userInfo:verifyToken});
    }catch(ErrorCaptureStackTrace){
        res.status(500).json({message:"Please log in first"});
    }
}

module.exports={
    register,
    login,
    update,
    logout,
    selectToken,
    me,
}