/*
	�����ļ�
*/


var resHandler = require('./lib/resHandler');
var handler = require('./lib/handler');

//����HTTP�˿ں�
exports.port = 3000;

//����վ���Ŀ¼
exports.root = './assets';

//���þ�̬��ҳ����ҳ
exports.index = 'index.html';


//ע���¼�����
handler.register('/login', resHandler.login);