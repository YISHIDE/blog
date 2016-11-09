/**
 * Created by 80474 on 2016/11/6.
 */
"use strict";
const db=require("./db");
function Article(article){
    this.title=article.title;
    this.content=article.content;
    this.time=article.time;
    this.uid=article.uid;
};
//把文章写入数据库
Article.prototype.save=function(callback){
    db.query("insert into article values(null,?,?,?,?)",[this.title,this.content,this.time,this.uid],function(){
            callback.apply(null,arguments);
    })
};
//根据id查找文章
Article.getArticleById=function(id,callback){
    db.query("select * from article as a inner join user as u where a.id=? and a.uid=u.id",[id],function(){
        callback.apply(null,arguments);
    })
};
//根据文章id查找对应文章的评论以及作者
Article.getComments=function(aid,callback){
    db.query("SELECT c.id,c.content,c.time,u.username,u.userImage from comments as c INNER JOIN user as u where c.aid=? AND c.uid=u.id",[aid],function(){
        callback.apply(null,arguments);
    })
}
//得到所有的文章列表
Article.getAllArticle=function(offset,pageSize,callback){
   db.query("select a.id,a.title,a.content,a.time,b.username,b.userImage from article as a INNER JOIN user as b WHERE a.uid=b.id order by a.time desc limit ?,?",[offset,pageSize],function(){
       callback.apply(null,arguments);
   });
};
Article.getCount=function(calllback){
    db.query("select count(id) as count from article",function(){
        calllback.apply(null,arguments);
    });
}
module.exports=Article;