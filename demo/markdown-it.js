/**
 * Created by 80474 on 2016/11/6.
 */
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();
var result = md.render('markdown-it rulezz!');
console.log(result);
