

var mysql = require('mysql');
var client = mysql.createConnection({'host':'localhost','port':3306,'user':'root','password':'12345','database':'firelion'});

client.connect();
/*
client.query('delete from usr',
				function(err,res){  
					if(err) console.log(err);
					console.log("DELETE Return ==> ");
					console.log(res);
				
         });	

client.query('select * from usr',
				function(err,rows){  
					if(err) console.log(err);
					console.log("SELECT ==> ");
					console.log(rows);
				
         });
		 
client.query('insert into usr (usrname,psw) values(\'conan\',\'123\')',
				function(err,res){  
					if(err) console.log(err);
					console.log("INSERT Return ==> ");
					console.log(res);
				
         });		 
*/
	
client.query('update usr set usrname=\'tyl\',psw=\'000\' where id=7 ',
				function(err,res){  
					if(err) console.log(err);
					console.log("UPDATA Return ==> ");
					console.log(res);
				
         });	
		 
client.query('select * from usr',
				function(err,rows){  
					if(err) console.log(err);
					console.log("SELECT ==> ");
					console.log(rows);
				
         });		 
		 