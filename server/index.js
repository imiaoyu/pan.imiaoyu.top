// const express = require('express');
// const app = express();
//
// const path = require('path');
//
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
//
// const cors = require('cors');
// const corsOptions = {
//   origin: 'http://localhost:8080',
//   optionSuccessStatus: 200
// };
// app.use(cors(corsOptions));
//
// const morgan = require('morgan');
// app.use(morgan('combined'));
//
// const md5 = require('md5');
//
// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination(req, res, cb) {
//     cb(null, './resource');
//   },
//   filename(req, file, cb) {
//     const fileNameArr = file.originalname.split('.');
//     const fileName = `${md5(fileNameArr[0])}.${fileNameArr[1]}`;
//     cb(null, fileName);
//   }
// });
// app.use(multer({ storage }).any());
//
// const db = require('./config/db.config');
//
// const cookie = require('cookie-parser');
//
// /* db.sequelize.sync({ force: true }).then(() => {
//   console.log('重建表');
// }); */
// require('./route/user.route')(app);
// require('./route/file.route')(app);
//
//
// //  创建服务器
// let server = app.listen(process.env.PORT || 8081, () => {
//   let host = server.address().address;
//   let port = server.address().port;
//   console.log('服务器启动: http://localhost:8081', host, port);
// });

const express=require('express');
const bodyParser=require('body-parser')
const  router=require('./router');
const  admin=require('./admin');
const app=express()
const JwtUtil = require('./jwt');




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))




// app.use(require('cors')());

const cors = require('cors');
const corsOptions = {
  origin: ['http://pan.imiaoyu.top','http://api.imiaoyu.top','http://imiaoyu.eh9.cn','http://localhost:8080'],
  Headers: ['Content-Type', 'Content-Length', 'Authorization', 'Accept', 'X-Requested-With' , 'yourHeaderFeild'],
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));

// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1');
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

app.use('/',router)
app.use(function (req, res, next) {
  // 我这里知识把登陆和注册请求去掉了，其他的多有请求都需要进行token校验
  if (req.url != '/v1/login' && req.url != '/v1/register' && req.url != '/') {
    let token = req.headers.token;
    let jwt = new JwtUtil(token);
    let result = jwt.verifyToken();
    // 如果考验通过就next，否则就返回登陆信息不正确
    if (result == 'err') {
      console.log(result);
      res.send({status: 403, msg: '登录已过期,请重新登录'});
      // res.render('login.html');
    } else {
      next();
    }
  } else {
    next();
  }
});

app.use('/v1',admin)
app.listen(3000,(req,res)=>{
  console.log('http://localhost:3000')
})
