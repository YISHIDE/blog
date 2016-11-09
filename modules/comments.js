/**
 * Created by 80474 on 2016/11/9.
 */
"use strict";
const db=require("./db");
function Comments(comments){
    this.aid=comments.aid;
    this.content=comments.content;
    this.uid=comments.uid;
    this.time=comments.time;
};
Comments.prototype.save=function(callback){
   db.query("insert into comments values(null,?,?,?,?)",[this.content,this.time,this.uid,this.aid],function(){
          callback.apply(null,arguments);
   })
};
module.exports=Comments;
