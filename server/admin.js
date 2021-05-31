let express=require('express');
const cors = require('cors');
let  router=express.Router();
var bodyParser = require('body-parser');
const  conn=require('./db');
const db=require("./db");
const qiniu = require("qiniu");


  // 上传文件
router.post('/file/add', (req,res)=>{
    const {file_name,hash_name,type,size,uid,url} = req.body;
    const upload_time = getNowFormatDate();
    console.log('上传日期：' + upload_time)
    const download = 0
    console.log(req.body)
    // let sql= `select * from video where up=${name}`;
    let sql= `insert into file(file_name,hash_name,type,size,upload_time,uid,url,download) values('${file_name}','${hash_name}','${type}','${size}','${upload_time}','${uid}','${url}','${download}')`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            console.log("失败")
            return
        }
        res.send({
            message:"上传成功",
            code:'200'
        })
    }
    db.dbConn(sql,sqlObj,callBack)
});

  // 查看文件
router.get('/file/list', (req,res)=>{
    // let sql= `select * from video where up=${name}`;
    // let sql= `select * from video where up='${username}'`;
    let sql= `select * from file`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        console.log("data:",data.length)
        if(err){
            // code:0,
            console.log("失败")
            // res.status(500).json('Error=>', err);
            return
        }
        res.send({
            message:"读取成功",
            code:200,
            data:{
                total_count:data.length,
                page:1,
                per_page:2,
                results:data
            }
        })
    }
    db.dbConn(sql,sqlObj,callBack)
});

  // 删除文件
router.delete('/file/delete/:hash_name/:id',  (req,res)=>{
    const {hash_name,id}=req.params;
    console.log(req.params);
    // let sql= `select * from video where up=${name}`;
    let sql= `delete from file where hash_name='${hash_name}' and id='${id}'`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            console.log("失败")
            return
        }
        else{
            res.send({
                message:"删除成功",
                code:200,
            })
        }
    }
    db.dbConn(sql,sqlObj,callBack)
});

  // 修改文件
router.put('/file/put',  (req,res)=>{
    const {download,id,file_name,url}=req.params;
    console.log(req.params);
    // let sql= `select * from video where up=${name}`;
    let sql= `update file set file_name='${file_name}',url='${url}',download='${download}') where id='${id}'`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            console.log("失败")
            return
        }
        else{
            res.send({
                message:"修改成功",
                code:200,
            })
        }
    }
    db.dbConn(sql,sqlObj,callBack)
});
// 封禁文件
router.put('/file/flag',  (req,res)=>{
    const {hash_name,flag,id}=req.params;
    console.log(req.params);
    // let sql= `select * from video where up=${name}`;
    let sql= `update user set flag='${flag}' where hash_name='${hash_name}' and id='${id}'`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            console.log("失败")
            return
        }
        else{
            res.send({
                message:"封禁成功",
                code:200,
            })
        }
    }
    db.dbConn(sql,sqlObj,callBack)
});

  // 登录
router.post('/login',function (req,res){
    const {username,password}=req.body;
    let sql=`select * from admin where username='${username}' and password='${password}'`
    console.log("sql",sql)
    let sqlObj=[]
    console.log("sqlObj",sqlObj)
    let callBack=function(err,data){
        if(err){
            console.log("失败")
            res.send({
                flag:0,
                message:"账号获取密码错误",
                code:400
            })
            return
        }
        if(data.length!=1){
            console.log("账号或密码错误")
            res.send({
                flag:0,
                message:"账号或密码错误",
                code:400
            })
            return
        }
        res.send({
            message:"登录成功",
            code:200,
            flag:1,
            data:{
                uid:data[0].uid,
                username:data[0].username
            }
        })
    }
    db.dbConn(sql,sqlObj,callBack)
})

  // 注册
router.post('/register',(req,res)=> {
    const {username,password} = req.body;
    // const password = req.body.password;
    let sql = `insert into admin(username,password) values('${username}','${password}')`
    console.log("sql", sql)
    let sqlObj = []
    console.log("sqlObj", sqlObj)
    let callBack = function (err, data) {
        // console.log("data:",data.length)
        if (err) {
            console.log("失败")
            return
        }
        res.send({
            message: "注册成功 请登陆",
            code: 200,
        })
    }
    db.dbConn(sql, sqlObj, callBack)
})

//用户管理----------------------------------------------------------------------------------------------------用户管理
  // 添加用户
router.post('/user/add',(req,res)=> {
    const {username,password} = req.body;
    // const password = req.body.password;
    let sql = `insert into user(username,password) values('${username}','${password}')`
    console.log("sql", sql)
    let sqlObj = []
    console.log("sqlObj", sqlObj)
    let callBack = function (err, data) {
        // console.log("data:",data.length)
        if (err) {
            console.log("失败")
            return
        }
        res.send({
            message: "添加成功",
            code: 200,
        })
    }
    db.dbConn(sql, sqlObj, callBack)
})
  // 查看用户
router.get('/user/list', (req,res)=>{
    let sql= `select * from user`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        console.log("data:",data.length)
        if(err){
            // code:0,
            console.log("失败")
            // res.status(500).json('Error=>', err);
            return
        }
        res.send({
            message:"读取成功",
            code:200,
            data:{
                total_count:data.length,
                page:1,
                per_page:2,
                results:data
            }
        })
    }
    db.dbConn(sql,sqlObj,callBack)
});

  // 删除用户
router.delete('/user/delete',  (req,res)=>{
    const {uid}=req.params;
    console.log(req.params);
    let sql= `delete from user where  uid='${uid}'`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            console.log("失败")
            return
        }
        else{
            res.send({
                message:"删除成功",
                code:200,
            })
        }
    }
    db.dbConn(sql,sqlObj,callBack)
});
  // 封禁用户
router.put('/user/flag',  (req,res)=>{
    const {flag,uid}=req.params;
    console.log(req.params);
    // let sql= `select * from video where up=${name}`;
    let sql= `update user set flag='${flag}' where uid='${uid}'`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            console.log("失败")
            return
        }
        else{
            res.send({
                message:"封禁成功",
                code:200,
            })
        }
    }
    db.dbConn(sql,sqlObj,callBack)
});

module.exports=router;
