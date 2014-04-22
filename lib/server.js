/*
	�Զ���HTTP������ģ��
*/

var http = require('http');
var config = require('../config');
var router = require('./router');
var url = require('url');

//����HTTP������������
var start = function()
{	
	//����HTTP������
	var server = http.createServer(function(request,response)
	{
		var urlpath = url.parse(request.url).pathname;
		//������ʵ���'/'��ֱ�Ӵ���ҳ
		if(urlpath === '/')
		{
			urlpath = urlpath + config.index;
		}
		var pathname = config.root + urlpath;
		//console.log("pathname:" + pathname);
		router.route(pathname,response);
		
	});
	//�趨�����˿ں�  һ����80�Ŷ˿�
	server.listen(config.port);
	console.log("server is starting at port:" + config.port);
}

exports.start = start;