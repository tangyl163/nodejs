/*

*/

var config = require('../config');

var handle = {};

exports.register = function(urlpath, event)
{
	var realpath = config.root + urlpath;
	handle[realpath] = event;
	//console.log('handler[realpath]:',handler[realpath]);
	//console.log('event:',event);
}


exports.handle = handle;