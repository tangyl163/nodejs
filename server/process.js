/*
	服务器请求处理函数
*/


	var login = function(response)
	{
		console.log("Request handler 'login' was called.");
		response.write("yes");
		response.end();		
	}
	
	exports.login = login;