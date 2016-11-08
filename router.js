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
router.get("/register",user.showRegister);
router.post("/register",user.doRegister);
router.get("/captcha",user.getCaptcha);
router.get("/login",user.showLogin);
router.post("/login",user.doLogin);
router.get("/logout",user.logout);
router.get("/article/add",article.showPublish);
router.post("/article/add",article.doAdd);
router.post("/article/upload",article.uploadImage);
router.get("/article/:articleId",article.showArticle);
module.exports=router;