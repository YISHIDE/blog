/**
 * Created by 80474 on 2016/11/4.
 */
"use strict";
const express=require("express");
const index=require("./controllers/index");
const user=require("./controllers/user");
const article=require("./controllers/article");
let router=express.Router();
//处理业务逻辑的
router.get("/",index.showIndex);
router.get("/article/list/:pageNumber",article.showAllArticle);
router.get("/register",[checkLogin,user.showRegister]);
router.post("/register",user.doRegister);
//router.get("/captcha",user.getCaptcha);
router.get("/login",[checkLogin,user.showLogin]);
router.post("/login",user.doLogin);
router.get("/logout",user.logout);
router.get("/article/add",[checkIsLogin,article.showPublish]);
router.post("/article/add",article.doAdd);
router.post("/article/upload",article.uploadImage);
router.get("/article/:articleId",article.showArticle);
router.post("/article/answer/:articleId",article.addComments);
//路由写请求的权限校验，即哪些页面需要登录才能够访问，哪些页面登录后不能访问的,权限封装
function checkLogin(req,res,next){
    if(req.session.user){
        return res.redirect("/");
    }
    next();
}
function checkIsLogin(req,res,next){
    if(!req.session.user){
        return res.redirect("/");
    }
    next();
}
module.exports=router;