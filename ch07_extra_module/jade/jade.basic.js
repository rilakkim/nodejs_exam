var http = require('http');
var fs = require('fs');
var jade = require('jade');

http.createServer(function(request, response){
	fs.readFile('jadePage.jade', 'utf8', function(error, data){
		var fn = jade.compile(data);

		response.writeHead(200, { 'Content-type': 'text/html' });
		response.end(fn());
	});
}).listen(52273, function(){
	console.log('Server running at http://127.0.0.1:52273');
});
