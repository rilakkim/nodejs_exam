var fs = require('fs');
var http = require('http');
var express = require('express');

var app = express();

app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(app.router);

app.get('/', function(request,response){
	if(request.cookies.auth){
		response.send('<h1>Login Success.</h1>');
	}else{
		response.redirect('/login');
	}	
});

app.get('/login', function(request, response){
	fs.readFile('login.html', function(error, data){
		response.send(data.toString());
	});
});

app.post('/login', function(request, response){
	var login = request.param('login');
	var password = request.param('password');
	
	console.log(login, password);
	console.log(request.body);

	if(login == 'admin' && password == '1234'){
		response.cookie('auth', true);
		response.redirect('/');
	}else{
		response.redirect('/login');
	}
});

http.createServer(app).listen(52273, function(){
	console.log("Server running at http://127.0.0.1:52273");
});
