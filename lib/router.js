/*
	路由模块
*/

var path = require('path');
var fs = require('fs');
var mime = require('./mime').types;
var handler = require('./handler');
var config = require('../config');
var zlib = require('zlib');

var route = function(pathname,request,response)
{
	//console.log("handler:" + handler);
	path.exists(pathname,function (exists){
        if (exists)	//判断文件是否存在 
		{
			//console.log('path.exists--%s', exists);
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
				response.setHeader("Content-Type", contentType);

				fs.stat(pathname, function (err, stat) {
					
					var lastModified = stat.mtime.toUTCString();
					var ifModifiedSince = "If-Modified-Since".toLowerCase();
				
					//设置文件缓存的过期时间
					if (ext.match(config.expires.fileMatch))
					{
						var expires = new Date();
						expires.setTime(expires.getTime() + config.expires.maxAge * 1000);
						response.setHeader("Expires", expires.toUTCString());
						response.setHeader("Cache-Control", "max-age=" + config.expires.maxAge);	
					}
				
					//查询是否文件是否有修改
					response.setHeader("Last-Modified", lastModified);
					if (request.headers[ifModifiedSince] && lastModified === request.headers[ifModifiedSince]) {
						response.writeHead(304, "Not Modified");
						response.end();
					}
					else
					{
						//直接读取文件
						//console.log("contentType:" + contentType);	
						console.log("pathname:" + pathname);
						var raw = fs.createReadStream(pathname);
						var acceptEncoding = request.headers['accept-encoding'] || "";
						var matched = ext.match(config.Compress.match);

						if (matched && acceptEncoding.match(/\bgzip\b/)) {
							response.writeHead(200, "Ok", {'Content-Encoding': 'gzip'});
							raw.pipe(zlib.createGzip()).pipe(response);
						} else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
							response.writeHead(200, "Ok", {'Content-Encoding': 'deflate'});
							raw.pipe(zlib.createDeflate()).pipe(response);
						} else {
							response.writeHead(200, "Ok");
							raw.pipe(response);
						}			
					}
				});		
	
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