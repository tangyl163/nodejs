/*
	�����ļ�
*/


var process = require('./server/process');
var handler = require('./lib/handler');

//����HTTP�˿ں�
exports.port = 3000;

//����վ���Ŀ¼
exports.root = 'D:/work/project/RDP/www.RDP.com.cn';

//���þ�̬��ҳ����ҳ
exports.index = 'index.html';

//����ָ����׺�ļ��͹�������
exports.expires = { 
	fileMatch: /^(gif|png|jpg|js|css)$/ig,
	maxAge: 60 * 60 * 24 * 365
 };
 
 exports.Compress={
	match: /css|js|html/ig
 };

//ע���¼�����
handler.register('/login', process.login);