/**
 * Created by 80474 on 2016/11/5.
 */
   "use strict";
const mysql = require('mysql');
const pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'blog',
    connectionLimit : 50
});
exports.query=function(sql,param,callback){
    //判断实参个数
    if(arguments.length===2 && typeof arguments[1]==="function")
    {
     callback=arguments[1];
      param=[];
    }
    else if(arguments.length===3 && Array.isArray(arguments[1]) && typeof arguments[2]==="function"){
     callback=arguments[2];
        param=arguments[1];
    }
    pool.query(sql,param,function(){
        callback.apply(null,arguments);
    });
};