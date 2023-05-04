var MongoClient = require('mongodb').MongoClient;
const {ObjectId} =require('mongodb');
var url = "mongodb://localhost:27017/song";
var databasename="song";
var filename="user";


//用户注册
const registerModel=async(postData)=>{
    var bl=false;
    var conn=null;
    conn=await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
    const user = conn.db(databasename).collection(filename);
    var query=await user.insertOne({ 
        "username": postData.username,
        "password":postData.password,
        "email":postData.email
    });
    if(query.result.ok==1){
        bl=true;
    }
    return bl;
}


//用户登录
const loginModel=async(postData)=>{
    var conn=null;
    conn=await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
    const user = conn.db(databasename).collection(filename);
    var query = await user.find({"email":postData.email}).toArray();
    return query;
}

//用户名查询
const findUsername=async(username)=>{
    var conn=null;
    conn=await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
    const user = conn.db(databasename).collection(filename);
    var query = await user.find({username:username}).toArray();
    return query;
}

//邮箱查询
const findEmailModel=async(email)=>{
    var conn=null;
    conn=await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
    const user = conn.db(databasename).collection(filename);
    var query = await user.find({email:email}).toArray();
    return query;
}



//用户信息修改
const updateModel=async(postData)=>{
    var bl=false;
    var conn=null;
    conn=await MongoClient.connect(url,{useNewUrlParser: true, useUnifiedTopology: true });
    const user = conn.db(databasename).collection(filename);
    var whereStr = {_id:ObjectId(postData._id)};  // 查询条件
    delete postData._id;
    var updateStr = {$set: { "username": postData.username,"password":postData.password,"email":postData.email}};   //修改内容
    var arr=await user.updateOne(whereStr,updateStr);
    console.log(arr.result.ok);
    if(arr.result.ok==1){
        bl=true;
    }
    return bl;
}






module.exports={
    registerModel,
    loginModel,
    findUsername,
    updateModel,
    findEmailModel,
}
