/*
	启动服务器
*/

var cluster = require('cluster');
var os = require('os');

//获取CPU数量
var numCPU = os.cpus().length;

//工作线程
var workers = {};

var start = function()
{
	//首先判断是否是主进程
	if(cluster.isMaster)
	{
		//初始开启与CPU数量相同的工作进程
		for(var i=0; i<numCPU; i++)
		{
			var worker = cluster.fork();
			workers[worker.pid] = worker;			
		}
	
		cluster.on('death',function(worker){
			//当一个工作进程结束时重启工作进程
			delete workers[worker.pid];
			worker = cluster.fork();
			workers[worker.pid] = worker;
		});
	}
	else	//进入工作进程分支，启动服务器
	{
		var server = require('./lib/server');
		server.start();
	}
	
	
	//当主进程被终止时，关闭所有的工作进程
	process.on('SIGTERM',function(){
		for(var pid in workers)
		{
			process.kill(pid);
		}
		
		process.exit(0);
	});
}

start();

/*
var server = require('./lib/server');


//启动服务器 
server.start();
*/