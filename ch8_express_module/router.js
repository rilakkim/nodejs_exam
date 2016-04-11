var http = require('http');
var express = require('express');

var app = express();

app.use(app.router);

app.get('/index', function(request, response){
	response.send('<h1>Index page</h1>');
});

app.all('*', function(request, response){
	response.send(404, '<h1>Error - Page Not Found</h1>');
});

http.createServer(app).listen(52273, function(){
	console.log('Server running at http://127.0.0.1:52273');
});
