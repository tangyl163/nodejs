/*
	自定义HTTP服务器模块
*/

	var http = require('http');
	var config = require('../config');
	var router = require('./router');
	var url = require('url');
	var util = require('util');
	var path = require('path');

	//启动HTTP服务器服务器
	var start = function()
	{	
		//创建HTTP服务器
		var server = http.createServer(onReadData);
		//设定监听端口号  一般是80号端口
		server.listen(config.port);
		console.log("server is starting at port:" + config.port);
	}


	var onReadData = function(request,response)
	{
		var urlpath = url.parse(request.url).pathname;
		//如果访问的是'/'，直接打开首页
		if(urlpath === '/')
		{
			urlpath = urlpath + config.index;
		}
		var realPath = path.join(config.root,path.normalize(urlpath.replace(/\.\./g, "")));
		//console.log("pathname:" + pathname);
		router.route(realPath,request,response);	
	}

	exports.start = start;