// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())
//设置公共class
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
//配置解析表单数据的中间插件
//导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt
const jwt = require('jsonwebtoken');
const expressjwt = require('express-jwt');

const secretKey = 'spotify';
//注册将 JWT 字符串解析还原成 JSON 对象的中间件
app.use(expressjwt({ secret: secretKey, algorithms: ['HS256'] }).unless({ path: [
                                                                            { url: '/user', methods: ['POST','GET','PUT'] },
                                                                            { url:'/user/logout',methods:['POST'] },
                                                                            { url:'/login',methods:['POST'] },
                                                                            { url:'/register',methods:['POST'] },
                                                                            { url:'/search',methods:['GET'] },
                                                                            { url:'/',methods:['GET'] },
                                                                    ] }));
app.use((err, req, res, next) => {
    // 这次错误是由 token 解析失败导致的
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        status: 401,
        message: 'Invalid token'
      })
    }
    res.status(500).json({
      status: 500,
      message: 'The token has expired. Please log in again'
    })
});



const userController=require(process.cwd()+'/controller/user');
const searchController=require(process.cwd()+'/controller/search');
const musicController=require(process.cwd()+'/controller/music');

app.get('/',function(){

});
app.get('/me',userController.selectToken);
app.put('/user',userController.update);
app.post('/login',userController.login);
app.post('/register',userController.register);
app.post('/user/logout',userController.logout);
app.get('/search',searchController.getSearch);
app.get('/music',musicController.findUidMusic);
app.delete('/music',musicController.deleteMusic);
app.post('/music',musicController.addMusic);



// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
    //node app.js   
    console.log("http://localhost:3007/");
})