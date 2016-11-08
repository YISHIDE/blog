/**
 * Created by 80474 on 2016/11/4.
 */
 "use strict";
//
//const db=require("./db");
const utility=require("utility");
const User=require("../modules/user");
exports.showRegister=function(req,res,next){
    if(req.session.user){
        return res.redirect("/");
    }
    res.render("register")
};
exports.doRegister=function(req,res,next){
    let username=req.body.username;
    let email=req.body.email;
    let password=req.body.password;
    //可以为字母，数字或者下划线，为3到10位的正则
    let regxUser =/^[\w\d_]{3,10}$/;
    //匹配密码，位数为8-16位
    let regxPassword=/^[\d\w]{8,16}$/;
    //匹配邮箱
    let regxEmail=/^[\w\-\.]+\@[\w]+\.[\w]{2,4}$/;
    if(!regxUser.test(username)){
        return res.json({
            code:100,
            msg:"用户名不符合规范"
        })
    }
    if(!regxPassword.test(password)){
        return res.json({
            code:300,
            msg:"密码不符合规范"
        })
    }
    if(!regxEmail.test(email)){
        return res.json({
            code:400,
            msg:"电子邮箱不符合规范"
        })
    }
    //逻辑校验。
    //判断用户名是否合法，
    //判断密码是否符合
    //判断用户名是否存在,邮箱是否符合
    //sql语句来执行
    //判断用户名是否存在，如果存在，则提示存在该用户
    User.isUser(username,function(err,row){
        if(err)
        {
            return next(err.message);
        }
        if(row.length!==0){
            return res.json({
                code:500,
                msg:"该用户名已存在"
            })
        }
        password = utility.md5(password+req.app.locals.config.secret);
        let user=new User({
            username,
            email,
            password
        });
        user.save(function(err,row){
            if(err){
                return next(err.message);
            }
            if(row.insertId)
            {
                req.session.user=user;
                user.id=row.insertId;
                res.json({
                    code:400,
                    msg:"用户注册成功"
                })
            }
        })
    });
    //db.query(`select * from user where username=?`,[`${username}`],function(err,row){
    //    if(err)
    //    {
    //        return next(err.message);
    //    }
    //    if(row.length!==0){
    //        return res.json({
    //            code:"500",
    //            msg:"用户名已存在"
    //        })
    //    }
    //    //插入到数据库中
    //    db.query(`INSERT INTO user VALUES(null,?,?,?)`,[`${username}`,`${password}`,`${email}`],function(err,rows){
    //        if(err)
    //        {
    //            return next(err.message);
    //        }
    //        if(rows.insertId){
    //            res.json({
    //                code:400,
    //                msg:"用户注册成功"
    //            })
    //        }
    //
    //    })
    //});

    //res.json({
    //    username,
    //    email,
    //    password
    //   })
};
exports.showLogin=function(req,res,next){
     if(req.session.user){
       return res.redirect("/")
     }
    res.render("login");
};
exports.doLogin=function(req,res,next){
    let username=req.body.username;
    let password=req.body.password;
    //判断用户名是否存在和密码是否正确
    password = utility.md5(password+req.app.locals.config.secret);
    User.login(username,password,function(err,row){
        if(err) {
          return next(err.message);
        }
        if(row.length==0) {
           return res.json({
                code:400,
                msg:"登录失败，用户名或密码不正确"
            })
        }
        req.session.user=row[0];
        res.json({
            code:200,
            msg:"登录成功"
        })
    })
};
//处理验证码请求
// 当每一次来请求这个验证码的处理函数的时候，都会动态的生成一张验证码图片，响应给客户端
exports.getCaptcha = function (req, res, next) {
    //
    //let ary = ccap().get();
    //
    //let txt = ary[0];
    //
    //let buf = ary[1];
    //
    //req.session.vcode = txt;
    //
    //res.end(buf);
res.end("123");
};
exports.logout=function(req,res,next){
   req.session.user=null;
   res.redirect("/");
};