/**
 * Created by 80474 on 2016/11/5.
 */
//创建user对象
"use strict";
const db=require("./db");
function User(user){
    this.username=user.username;
    this.email=user.email;
    this.password=user.password
};
//用户后台的方法
//判断用户是否存在
//保存数据到数据库
User.isUser=function(usename,callback){
   db.query("select * from user where username=?",[usename],function(){
       callback.apply(null,arguments);
   })
};
User.prototype.save=function(callback){
   db.query("insert into user values(null,?,?,?)",[this.username,this.password,this.email],function(){
       callback.apply(null,arguments);
   });
};
User.login=function(username,password,callback){

    db.query("select * from user where username=? and password=?",[username,password],function(){
      callback.apply(null,arguments);
  })
};
module.exports=User;