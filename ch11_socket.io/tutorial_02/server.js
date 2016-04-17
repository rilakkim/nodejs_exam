var fs = require('fs');

var server = require('http').createServer();
var io = require('socket.io').listen(server);

server.listen(52273, function(){
	console.log("Server running at http://127.0.0.1:52273");
});

server.on('request', function(request, response){
	fs.readFile('HTMLPage.html', 'utf8', function(error, data){
		response.writeHead(200, { 'Content-Type':'text/html' });
		response.end(data);
	});
});

io.sockets.on('connection', function(socket){
	var name = null;

	socket.on('setname', function(data){
		console.log("DEBUG::", data);
		name = data;
	});

	socket.on('getname', function(){
		socket.emit('responsename', name);
	});
});
