var http = require('http');

http.createServer(function(request, response){
	response.writeHead(302, { 'Location': 'http://naver.com'});
	response.end();
}).listen(52273, function(){
	console.log('Server running at http://127.0.0.1:52273');
});

