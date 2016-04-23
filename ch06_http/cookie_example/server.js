var http = require('http');

http.createServer(function (request, response){
	var date = new Date();
	date.setDate(date.getDate() + 7);

	response.writeHead(200, {
		'Content-type': 'text/html',
		'Set-Cookie': [
			'breakfast = toast;Expires = ' + date.toUTCString(),
			'dinner = chicken'
		]
	});

	response.end('<h1>' + request.headers.cookie + '</h1>');
}).listen(52273, function(){
	console.log('Server running at http://127.0.0.1:52273');
});
