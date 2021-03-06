let express=require('express');
const cors = require('cors');
let  router=express.Router();
var bodyParser = require('body-parser');
const  conn=require('./db');
const db=require("./db");
const qiniu = require("qiniu");


// 创建application/json 解析器
var jsonParser = bodyParser.json()

// 创建 application/x-www-form-urlencoded 解析器
var urlencodedParser = bodyParser.urlencoded({ extended: true })

// 上传文件
router.post('/api/newarticle', (req,res)=>{
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



// 获取频道（后台）
router.get('/api/channels', (req,res)=>{
    const {file_name,hash_name,type}=req.body;
    const upload_time = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()

    console.log(req.body.username);
    // let sql= `select * from video where up=${name}`;
    let sql= `select * from channel`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        console.log("data:",data.length)
        if(err){
            console.log("失败")
            return
        }
        res.send({
            message:"ok",
            code:201,
            data:{
                channels:data
            }
        })
    }
    db.dbConn(sql,sqlObj,callBack)
});

//获取文件
router.get('/api/list', (req,res)=>{
    const uid=req.query.uid;
    console.log('uid:'+uid);
    // let sql= `select * from video where up=${name}`;
    // let sql= `select * from video where up='${username}'`;
    let sql= `select * from file where uid='${uid}'`;
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

// 获取单个文件数据
router.get('/api/single-list', (req,res)=>{
    const hash_name = req.query.hash_name;
    console.log('hsah_name:'+hash_name);
    // let sql= `select * from video where up=${name}`;
    // let sql= `select * from video where up='${username}'`;
    let sql= `select * from file where hash_name='${hash_name}'`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            // code:0,
            console.log("获取单个文件失败")
            // res.status(500).json('Error=>', err);
            return
        }
        res.send({
            message:"读取成功",
            flag:1,
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

//删除文件
router.delete('/api/articless/:hash_name/:id',  (req,res)=>{
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

//登录
router.post('/user/login',function (req,res){
    // var mobile = req.body.username
    // var code = req.body.password
    console.log("服务端",req.body)
    const {username,password}=req.body;
    let sql=`select * from user where username='${username}' and password='${password}'`
    console.log("sql",sql)
    let sqlObj=[]
    console.log("sqlObj",sqlObj)
    let callBack=function(err,data){
        if(err){
            console.log("失败")
            res.send({
                flag:0,
                message:"账号或密码错误",
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
        if(data[0].flag==0){
            console.log("账号被封禁")
            res.send({
                flag:3,
                message:"账号被封禁",
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
            // console.log(data[0].uid+' '+data[0].username)
            console.log('登录成功')
    }
    db.dbConn(sql,sqlObj,callBack)
    // res.json(name+pwd);
    // var query1 = "select * from user where 'username="+name+"' and 'password="+pwd+"'"
    // connection.query(query1,function(err,result){
    //     if (err) throw err;
    //     console.log("!!!",result)
    //     if(result.length==0){
    //         res.send("用户名或密码错误")
    //     }else{res.send("<h2>登录成功，欢迎<h2>")}
    // })
})

//注册
router.post('/user/add',function (req,res) {
    // var mobile = req.body.username
    // var code = req.body.password
    console.log("服务端", req.body)
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
        // if (data.length != 1) {
        //     console.log("不可抗力原因导致注册失败")
        //     res.send({
        //         flag: 0,
        //         message: "不可抗力原因导致注册失败",
        //         code: 500
        //     })
        //     return
        // }
        res.send({
            message: "注册成功 请登陆",
            code: 200,
        })
        // console.log(data[0].uid+' '+data[0].username)
        console.log('注册成功')


    }
    db.dbConn(sql, sqlObj, callBack)

})

// 分享上传信息
router.post('/api/uploadshare', (req,res)=>{
    const {url,skey,uid,sid,file_name,size,hash_name} = req.body;
    console.log('分享sid：' + sid)
    console.log(req.body)
    // let sql= `select * from video where up=${name}`;
    let sql= `insert into share(url,skey,uid,sid,file_name,size,hash_name) values('${url}','${skey}','${uid}','${sid}','${file_name}','${size}','${hash_name}')`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            console.log("失败")
            return
        }
        res.send({
            flag:1,
            message:"成功",
            code:'200'
        })
    }
    db.dbConn(sql,sqlObj,callBack)
});

// 查询分享的数据
router.get('/api/share-list', (req,res)=>{
    const sid = req.query.sid;
    console.log('sid:'+sid);
    // let sql= `select * from video where up=${name}`;
    // let sql= `select * from video where up='${username}'`;
    let sql= `select * from share where sid='${sid}'`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            // code:0,
            console.log("获取分享文件失败")
            // res.status(500).json('Error=>', err);
            return
        }
        res.send({
            message:"获取成功",
            flag:1,
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

// 收藏
router.post('/api/collection', (req,res)=>{
    const {uid,url,username,file_name,hash_name,sid,skey} = req.body;
    console.log(req.body)
    // let sql= `select * from video where up=${name}`;
    let sql= `insert into collection(uid,url,username,file_name,hash_name,sid,skey) values('${uid}','${url}','${username}','${file_name}','${hash_name}','${sid}','${skey}')`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            console.log("失败")
            return
        }
        res.send({
            flag: 1,
            message:"收藏成功",
            code:'200'
        })
    }
    db.dbConn(sql,sqlObj,callBack)
});


// 判断用户是否存在
router.post('/user/signuser',function (req,res){
    // var mobile = req.body.username
    // var code = req.body.password
    console.log("判断用户是否存在：",req.body.username)
    const {username}=req.body;
    let sql=`select * from user where username='${username}'`
    console.log("sql",sql)
    let sqlObj=[]
    console.log("sqlObj",sqlObj)
    let callBack=function(err,data){
        // console.log(data.length)
        if(err){
            console.log("失败")
            return
        }
        else if(data.length ==1){
            console.log("已存在该用户")
            res.send({
                flag:0,
                message:"已存在该用户",
                code:400
            })
            return
        }else {
            console.log("可以注册")
            res.send({
                flag:1,
                message:"可以注册",
                code:200,
            })
            return
        }
    }
    db.dbConn(sql,sqlObj,callBack)

})


//修改密码
router.put('/user/update', (req,res)=>{
    // var mobile = req.body.username
    // var code = req.body.password
    console.log("服务端",req.body)
    const {oldPassword,newPassword,uid}=req.body;
    let sql=`update user set password='${newPassword}' where password='${oldPassword}' and uid='${uid}'`
    console.log("sql",sql)
    let sqlObj=[]
    console.log("sqlObj",sqlObj)
    let callBack=function(err,data){
        // console.log(data.length)
        if(err){
            console.log("失败")
            return
        }
        // data.affectedRows应该是判断数据更新结果的状态码 0：失败 1：成功
        else if(data.affectedRows==0){
            console.log("失败")
            res.send({
                flag:0,
                message:"旧密码输入错误",
                code:400
            })
            return
        }else {
            console.log("成功")
            res.send({
                flag:1,
                message:"修改成功",
                code:200,
            })

        }
    }
    db.dbConn(sql,sqlObj,callBack)

})

//下载量计算
router.get('/api/download', (req,res)=>{
    const hash_name = req.query.hash_name;
    // let sql= `select * from video where up=${name}`;
    // let sql= `select * from video where up='${username}'`;
    let sql= `update file set download=download+1 where hash_name='${hash_name}'`
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            // code:0,
            console.log("失败")
            // res.status(500).json('Error=>', err);
            return
        }
        res.send({
            message:"成功",
            flag:1,
            code:200,
        })
    }
    db.dbConn(sql,sqlObj,callBack)
});

// 查询收藏数据
router.get('/api/collection', (req,res)=>{
    const {uid,sid} = req.query;
    // let sql= `select * from video where up=${name}`;
    // let sql= `select * from video where up='${username}'`;
    let sql= `select * from collection where sid='${sid}' and uid ='${uid}'`
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            // code:0,
            console.log("失败")
            // res.status(500).json('Error=>', err);
            return
        }if (!data.length) {
            res.send({
                message:"失败",
                flag:0,
                code:200
            })
        }
        res.send({
            message:"成功",
            flag:1,
            code:200
        })
    }
    db.dbConn(sql,sqlObj,callBack)
});
// 收藏列表
router.get('/api/collection_list', (req,res)=>{
    const uid = req.query.uid;
    // let sql= `select * from video where up=${name}`;
    // let sql= `select * from video where up='${username}'`;
    let sql= `select * from collection where uid='${uid}'`
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            // code:0,
            console.log("失败")
            // res.status(500).json('Error=>', err);
            return
        }
        res.send({
            message:"成功",
            flag:1,
            code:200,
            results:data
        })
    }
    db.dbConn(sql,sqlObj,callBack)
});

//删除收藏数据
router.delete('/api/collection_delete/:hash_name/:id',  (req,res)=>{
    const {hash_name,id}=req.params;
    console.log(req.params);
    // let sql= `select * from video where up=${name}`;
    let sql= `delete from collection where hash_name='${hash_name}' and id='${id}'`;
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

// 用户反馈
router.post('/api/feedback', (req,res)=>{
    const {uid,content} = req.body;
    console.log('用户反馈：' + content)
    console.log(req.body)
    // let sql= `select * from video where up=${name}`;
    let sql= `insert into feedback(uid,content) values('${uid}','${content}')`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            console.log("失败")
            return
        }
        res.send({
            flag:1,
            message:"成功",
            code:'200'
        })
    }
    db.dbConn(sql,sqlObj,callBack)
});

// 分享列表
router.get('/api/myshare_list', (req,res)=>{
    const uid = req.query.uid;
    // let sql= `select * from video where up=${name}`;
    // let sql= `select * from video where up='${username}'`;
    let sql= `select * from share where uid='${uid}'`
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        // console.log("data:",data.length)
        if(err){
            // code:0,
            console.log("失败")
            // res.status(500).json('Error=>', err);
            return
        }
        res.send({
            message:"成功",
            flag:1,
            code:200,
            results:data
        })
    }
    db.dbConn(sql,sqlObj,callBack)
});
// 删除分享数据
router.delete('/api/myshare_delete/:hash_name/:id', (req,res)=>{
    const {hash_name,id}=req.params;
    // let sql= `select * from video where up=${name}`;
    // let sql= `select * from video where up='${username}'`;
    let sql= `delete from share where hash_name='${hash_name}' and id='${id}'`;
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

//新增数据
router.post('/api/InsertUserMsg',(req,res)=>{
    conn.query('INSERT INTO usermsg SET ?',req.body,(err,results)=>{
        if(err){
            res.json({code:1,msg:'添加数据失败'})
        }else {
            res.json({code:0,msg:'添加数据成功'})
        }
    })
});

//删除数据
router.post('/api/delUserMsg',(req,res)=>{
    conn.query('DELETE FROM usermsg WHERE id=?',[req.body.id],(err,results)=>{
        if(err){
            res.json({code:1,msg:'修改数据失败'})
        }else {
            res.json({code:0,msg:'修改数据成功'})
        }
    })
});



//生成七牛云上传token
router.get('/api/uploadToken',function(req,res){
    const accessKey = 'yVMbT3GZy653wFpbsRjzq3IF6zQIMS_b7kI9ZoQA';
    const secretKey = 'mrxTRhOg1bEJR9dZ2Z572B-5YhT00fIb3-b6i6XA';

    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

    const bucket = 'pan-imiaoyu';

    const options = {
        scope: `${bucket}`,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    const token = putPolicy.uploadToken(mac)
    res.send({
        message:"ok",
        code:201,
        token:token
    })
    console.log(token)
    // console.log(putPolicy.uploadToken(mac));
})


// Web端API
// 获取频道(web)
router.get('/web/channels', (req,res)=>{
    // let sql= `select * from video where up=${name}`;
    let sql= `select * from channel`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        console.log("data:",data.length)
        if(err){
            console.log("失败")
            return
        }
        res.send({
            message:"ok",
            data:{
                channels:data
            }
        })
    }
    db.dbConn(sql,sqlObj,callBack)
});

//获取文章列表（web）
router.get('/web/articles',  (req,res)=>{
    const {channel_id}=req.query;
    console.log(channel_id);

    let sql= `select * from channel,video where channel.id='${channel_id}' and channel.name = video.channel`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        console.log("data:",data.length)
        if(err){
            console.log("失败")
            return
        }
        res.send({
            message:"OK",
            data:{
                total_count:10,
                page:1,
                per_page:2,
                pre_timestamp: 1613658503995,
                results:data
            },
        })
        console.log(data)
    }
    db.dbConn(sql,sqlObj,callBack)
});

// router.get('/web/articles',  (req,res)=>{
//         res.send({
//             message:"OK",
//             data:{
//                 pre_timestamp: 1613658503995,
//                 results:[
//                     {title: '111111',
//                         aut_id: 1,
//                         pubdate: '2020-11-10T19:53:17',
//                         ch_id: 2,
//                         cover: {
//                             type: 0,
//                             "images": []
//                         },
//                         "is_top": 0,
//                         "art_id": 1326130807823138800,
//                         "aut_name": "有点666",
//                         "comm_count": 16,
//                         "like_count": 4,
//                         "collect_count": 9,
//                     }
//                 ]
//             },
//         })
//
// });

// 获取当前时间并格式化同一格式 在上传文件api中使用
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "/";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}


// admin后台
//获取文章列表（后台）
router.get('/admin/articles',  (req,res)=>{
    // const {channel_id}=req.query;
    // console.log(channel_id);
    let sql= `select * from file`;
    console.log("sql",sql)
    let sqlObj=[]
    let callBack=function(err,data){
        console.log("data:",data.length)
        if(err){
            console.log("失败")
            return
        }
        res.send({
            message:"OK",
            data:{
                total_count:10,
                page:1,
                per_page:2,
                pre_timestamp: 1613658503995,
                results:data
            },
        })
        console.log(data)
    }
    db.dbConn(sql,sqlObj,callBack)
});
module.exports=router;
