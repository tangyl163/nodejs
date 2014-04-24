/*
	配置文件
*/


var process = require('./server/process');
var handler = require('./lib/handler');

//设置HTTP端口号
exports.port = 3000;

//设置站点根目录
exports.root = 'D:/work/project/RDP/www.RDP.com.cn';

//设置静态网页的首页
exports.index = 'index.html';

//对于指定后缀文件和过期日期
exports.expires = { 
	fileMatch: /^(gif|png|jpg|js|css)$/ig,
	maxAge: 60 * 60 * 24 * 365
 };
 
 exports.Compress={
	match: /css|js|html/ig
 };

//注册事件处理
handler.register('/login', process.login);