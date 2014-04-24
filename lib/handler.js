/*

*/

var config = require('../config');

var handle = {};

exports.register = function(urlpath, event)
{
	var realpath = config.root + urlpath;
	handle[realpath] = event;
}


exports.handle = handle;