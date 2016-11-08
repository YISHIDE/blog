/**
 * Created by 80474 on 2016/11/4.
 */
exports.showIndex=function(req,res,next){
      if(req.session.user){
         return res.render("index",{user:req.session.user});
      }
      res.render("index");
}