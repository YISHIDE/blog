/**
 * Created by 80474 on 2016/11/4.
 */
"use strict";
const Article=require("../modules/article");
exports.showIndex=function(req,res,next){
     Article.getCount(function(err,row){
        if(err)
        {
            return next(err.message);
        }
         let count=Math.ceil(row[0]["count"]/(req.app.locals.config.articleSize));
         res.render("index",{user:req.session.user,
             count
         });
     });
}