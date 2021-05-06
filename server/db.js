// //连接数据库信息
// const  mysql=require('mysql');
// const  conn=mysql.createConnection({
//     host:'127.0.0.1',
//     user:'root',
//     password:'root',
//     database:'cms',
//     multipleStatements:true
// });
//
//
//
//
// conn.connect();
// module.exports=conn;


const mysql=require("mysql")

module.exports={
    config:{
        host:"localhost",
        user:"root",
        password:"root",
        database:"pan"
    },
    dbConn:function(sql,sqlObj,callBack){
        let pool=mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            if(err){
                console.log(err)
                return;
            }
            conn.query(sql,sqlObj,callBack)
            conn.release();

        })
    }
}
