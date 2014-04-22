

var login = function(response)
{
	console.log("Request handler 'login' was called.");
	response.write("yes");
	response.end();
}

exports.login = login;