/*
	路由模块
*/

var path = require('path');
var fs = require('fs');
var mime = require('./mime').types;
var handler = require('./handler');

var route = function(pathname,response)
{
	//console.log("handler:" + handler);
	path.exists(pathname,function (exists){
        if (exists)	//判断文件是否存在 
		{
			fs.readFile(pathname,function (err, file)
			{
				  if (err) 
				  {
					response.writeHead(500, {'Content-Type': 'text/plain'});
					response.end(err);
				  }	
				  else
				  {
					var ext = path.extname(pathname);
					ext = ext ? ext.slice(1) : 'unknown';
					var contentType = mime[ext] || "text/plain";
					//console.log("contentType:" + contentType);
					console.log("pathname:" + pathname);
					response.writeHead(200, {'Content-Type': contentType});
					response.write(file, 'binary');
					response.end();
				  }
			});
		}
		else if(typeof handler.handle[pathname] === 'function')	//判断处理函数是否存在
		{
			handler.handle[pathname](response);
		}
		else	
		{
			response.writeHead(404, {'Content-Type': 'text/plain'});	
			response.write("This request URL " + pathname + " was not found on this server.");
			response.end();			
		}
	});
}

exports.route = route;