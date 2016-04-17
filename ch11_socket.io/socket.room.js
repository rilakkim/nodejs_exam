var fs = require('fs');

var server = require('http').createServer();
var io = require('socket.io').listen(server);

server.listen(52273, function(){
	console.log("Server running at htt[://127.0.0.1:52273");
});

server.on('request', function(request, response){
	fs.readFile('HTMLPage.html', function(error, data){
		response.writeHead(200, { 'Content-Type':'text/html'});
		response.end(data);
	});
});

io.sockets.on('connection', function(socket){
	socket.on('join', function(data){
		socket.join(data);
		socket.set('room', data);
	});

	socket.on('message', function(data){
		socket.get('room', function(error, data){
			io.sockets.in(room).emit('message', data);
		});
	});
});




