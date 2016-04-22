//모듈 추출
var socketio	= require('socket.io');
var express	= require('express');
var http	= require('http');
var fs		= require('fs');

//변수 선언(극장 좌석)
var seats = [
	// 0 : empty seat
	// 1 : available seat
	// 2 : reserved seat
	[1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
	[1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
];

//웹 서버 생성
var app = express();

//미들 웨어 설정
app.use(app.router);

//라우팅 수행
app.get('/', function(request, response, next){
	fs.readFile('HTMLPage.html', function(error, data){
		response.send(data.toString());
	});
});

app.get('/seats', function(request, response, next){
	response.send(seats);
});

//웹 서버 실행
var server = http.createServer(app);
server.listen(52273, function(){
	console.log("Server running at http://127.0.0.1:52273");
});

//소켓 서버 생성 및 실행
var io = socketio.listen(server);
io.sockets.on('connection', function(socket){
	socket.on('reserve', function(data){
		seats[data.y][data.x] = 2;
		io.sockets.emit('reserve', data);
	});

        socket.on('cancel', function(data){
                seats[data.y][data.x] = 1;
                io.sockets.emit('cancel', data);
        });
});
