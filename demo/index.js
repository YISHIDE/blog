/**
 * Created by 80474 on 2016/11/4.
 */
    "use strict";
var xtpl = require('xtpl');
xtpl.renderFile('./login.xtpl',{
    title:'登录页面'
}, function (error,content){
  if(error){
     return console.log("模板渲染错误");
  }
   console.log(content);
});
