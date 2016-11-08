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
    db.query("select * from article where id=?",[id],function(){
        callback.apply(null,arguments);
    })
};
//得到所有的文章列表
Article.getAllArticle=function(offset,pageSize,callback){
   db.query("select * from article limit ?,?",[offset,pageSize],function(){
       callback.apply(null,arguments);
   });
};
Article.getCount=function(calllback){
    db.query("select count(id) as count from article",function(){
        calllback.apply(null,arguments);
    });
}
module.exports=Article;