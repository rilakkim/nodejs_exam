var fs = require('fs');
var http = require('http');
var express = require('express');

var DummyDB = (function(){
	var DummyDB = {};
	var storage = [];
	var count= 1;

	DummyDB.get = function(id){
		if(id) {
			id = (typeof id == 'string') ? Number(id) : id;

			for(var i in storage) {
				if (storage[i].id == id){
					return storage[i];
				}
			}
		}else{
			return storage;
		}
	};

	DummyDB.insert = function(data){
		data.id = count++;
		storage.push(data);
		return data;
	};

	DummyDB.remove = function(id) {
		id = (typeof id == 'string') ? Number(id) : id;

		for(var i in storage) {
			if (storage[i].id == id) {
				storage.splice(i,1);
				
				return true;
			}
		}

		return false;
	};
})();

var app = express();

app.use(express.bodyParser());
app.use(app.router);

app.get('/user', function(request, response) {
	response.send(DummyDB.get());
});

app.get('/user/:id', function(request, response) { 
	response.send(DummyDB.get(request.param('id')));
});

app.post('/user', function(request, response) { 
	var name = request.param('name');
	var region = request.param('region');
	
	

	if(name && region){
		response.send(DummyDB.insert({
			name: name,
			region: region
		}));
	} else {
		throw new Error('error');
	}
});

app.put('/user/:id', function(request, response) { 
	var id = request.param('id');
	var name = request.param('name');
	var region = request.param('region');

	var item = DummyDB.get(id);
	item.name = name || item.name;
	item.region = region || item.region;
	
	response.send(item);
});

app.del('/user/:id', function(request, response) { 
	response.send(DummyDB.remove(request.param('id')));
});

http.createServer(app).listen(52273, function(){
	console.log("Server running at http://127.0.0.1:52273");
});

