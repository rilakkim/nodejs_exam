var http = require('http');

http.createServer(function(request, response){
	response.writeHead(200, { 'Content-type' : 'text/html' });
	response.end('<h1>Test - File - 2</h1>');
}).listen(52273, function(){
	console.log('Server running at 127.0.0.1:52273');
});
