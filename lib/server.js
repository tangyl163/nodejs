/*
	�Զ���HTTP������ģ��
*/

	var http = require('http');
	var config = require('../config');
	var router = require('./router');
	var url = require('url');
	var util = require('util');
	var path = require('path');

	//����HTTP������������
	var start = function()
	{	
		//����HTTP������
		var server = http.createServer(onReadData);
		//�趨�����˿ں�  һ����80�Ŷ˿�
		server.listen(config.port);
		console.log("server is starting at port:" + config.port);
	}


	var onReadData = function(request,response)
	{
		var urlpath = url.parse(request.url).pathname;
		//������ʵ���'/'��ֱ�Ӵ���ҳ
		if(urlpath === '/')
		{
			urlpath = urlpath + config.index;
		}
		var realPath = path.join(config.root,path.normalize(urlpath.replace(/\.\./g, "")));
		//console.log("pathname:" + pathname);
		router.route(realPath,request,response);	
	}

	exports.start = start;