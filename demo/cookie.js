/**
 * Created by 80474 on 2016/11/4.
 */
"use strict";
const fs=require("fs");
const path=require("path");
const http=require("http");
const url=require("url");
http.createServer(function(req,res){
    let pathname=url.parse(req.url).pathname;
    if(pathname=="/"){
        console.log(req.headers);
        let arr=req.headers.cookie ||"";
        arr=arr.split("=");
        let cookieObj={};
        cookieObj[arr[0]]=arr[1];
        if(cookieObj.isVisite){
            res.writeHead(200,{
                "Content-Type":"text/html; charset=utf-8"
            });
            res.end("欢迎再次访问");
        }
        else{
            res.writeHead(200,{
                "Set-Cookie":"isVisite=true; Max-Age=600",
                "Content-Type":"text/html; charset=utf-8"
            });
            res.end("hello world");
        }

    }
}).listen(3000,function(){
    console.log("端口监听成功");
})
