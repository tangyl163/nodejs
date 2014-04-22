/*
	配置文件
*/


var resHandler = require('./lib/resHandler');
var handler = require('./lib/handler');

//设置HTTP端口号
exports.port = 3000;

//设置站点根目录
exports.root = './assets';

//设置静态网页的首页
exports.index = 'index.html';


//注册事件处理
handler.register('/login', resHandler.login);