/**
 * Created by 80474 on 2016/11/4.
 */
    "use strict";
const moment = require('moment');
const Article=require("../modules/article");
const MarkdownIt = require('markdown-it');
const formidable = require("formidable");
const fs=require("fs");
const path=require("path");
exports.showPublish=function(req,res,next)
{
    if(!req.session.user)
    {
       return res.redirect("/");
    }
    res.render("add",{user:req.session.user});
};
exports.doAdd=function(req,res,next){
  let title=req.body.title.trim();
    console.log(typeof title);
  let content=req.body.content;
 //基本的校验
  let uid=req.session.user.id;
  let time=moment().format('YYYY-MM-DD HH:mm:ss');
  let article=new Article({
      title,
      content,
      uid,
      time,
  });
  article.save(function(err,row){
      if(err)
      {
          return next(err.message);
      }
      if(row.insertId){
          return res.json({
             code:200,
              msg:"写入成功",
              insertId:row.insertId
          });
      }
  })
};
exports.showArticle=function(req,res,next){
    if(!req.session.user){
        return res.redirect("/");
    }
  //获得匹配的文章id号
    let id=req.params.articleId;
    //根据id把文章从数据库中读取出来，再渲染到页面上
    Article.getArticleById(id,function(err,row){
        if(err)
        {
          return next(err.message);
        }
        if(row.length!==0)
        {

              let md = new MarkdownIt();
            let content = md.render(row[0].content);
            row[0].content=content;
            res.render("article",{article:row[0],
            user:req.session.user
            });
        }
    })
    //res.render("article");
};
exports.uploadImage=function(req,res,next){
    let form = new formidable.IncomingForm();
    form.uploadDir=req.app.locals.config.uploadDir;
    //form.uploadDir = "./uploads";//定义图片上传路径
    form.parse(req, function(err, fields, files) {
      if(err)
      {
        return res.json({
            code:400,
            msg:"图片上传失败"
        })
      }
        console.log(files);
        let pic=files.pic;
        let extname=path.extname(pic.name);
        let oldPath=pic.path;
        let newPath=oldPath+extname;
        fs.rename(oldPath,newPath,function(){
            res.json({
                code:200,
                msg:`/uploads/${path.basename(newPath)}`
            })
        })
    })
}