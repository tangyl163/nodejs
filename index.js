/*
	����������
*/

var cluster = require('cluster');
var os = require('os');

//��ȡCPU����
var numCPU = os.cpus().length;

//�����߳�
var workers = {};

var start = function()
{
	//�����ж��Ƿ���������
	if(cluster.isMaster)
	{
		//��ʼ������CPU������ͬ�Ĺ�������
		for(var i=0; i<numCPU; i++)
		{
			var worker = cluster.fork();
			workers[worker.pid] = worker;			
		}
	
		cluster.on('death',function(worker){
			//��һ���������̽���ʱ������������
			delete workers[worker.pid];
			worker = cluster.fork();
			workers[worker.pid] = worker;
		});
	}
	else	//���빤�����̷�֧������������
	{
		var server = require('./lib/server');
		server.start();
	}
	
	
	//�������̱���ֹʱ���ر����еĹ�������
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


//���������� 
server.start();
*/