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
Article.prototype.save=function(callback){
    db.query("insert into article values(null,?,?,?,?)",[this.title,this.content,this.time,this.uid],function(){
            callback.apply(null,arguments);
    })
};
Article.getArticleById=function(id,callback){
    db.query("select * from article where id=?",[id],function(){
        callback.apply(null,arguments);
    })
}
module.exports=Article;