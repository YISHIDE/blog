/**
 * Created by 80474 on 2016/11/4.
 */
    "use strict";
const moment = require('moment');
const Comments =require("../modules/comments");
const Article=require("../modules/article");
const MarkdownIt = require('markdown-it');
const formidable = require("formidable");
const fs=require("fs");
const path=require("path");
exports.showPublish=function(req,res,next) {
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
  //获得匹配的文章id号
    let id=req.params.articleId;
    //根据id把文章从数据库中读取出来，再渲染到页面上
    Article.getArticleById(id,function(err,row){
        if(err) {
          return next(err.message);
        }
        if(row.length!==0) {
            let list={};
            let md = new MarkdownIt();
            //markdown插件渲染成html的页面
            let content = md.render(row[0].content);
            row[0].content=content;
            list.article=row[0];
            //根据文章的id找到对应的评论
            Article.getComments(id,function(err,result){
               if(err){
                  return next(err.message);
               }
               list.comments=result;
                res.render("article",{
                    list:list,
                    user:req.session.user
                });
            });
        }
    })
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
};
exports.showAllArticle=function(req,res,next){
    //得到前台传过来的页码数字
    moment.locale('zh-cn');
    let pageNumber=req.params.pageNumber;
    //后台约定每页传递多少
    let pageSize=req.app.locals.config.articleSize;//最好写在配置文件中
    //计算定位的页数
    let pageOffset=(pageNumber-1)*pageSize;
    //mysql数据库查询,进行和作者匹配的多表查询
    Article.getAllArticle(pageOffset,pageSize,function(err,row){
        if(err){
          return next(err.message);
        }
        //对row数组中每项time进行修改
        row.map(a=>a.time = moment(a.time).startOf('second').fromNow());
        if(row.length!==0) {
            res.json({
                code:"200",
                result:row
            })
        }
    })
};
//添加评论
exports.addComments=function(req,res,next){
    let uid=req.session.user.id;
    let aid=req.params.articleId;
    let content=req.body.content;
    let time=moment().format('YYYY-MM-DD HH:mm:ss');
    //做基本的校验
    let comments=new Comments({
        uid,
        aid,
        content,
        time
    });
    comments.save(function(err,row){
       if(err)
       {
         return  next(err.message);
       }
       if(row.insertId!==0)
       {
           comments.username=req.session.user.username;
           comments.userImage=req.session.user.userImage;
           res.json({
               code:"200",
               comments
           })
       }
    });
};