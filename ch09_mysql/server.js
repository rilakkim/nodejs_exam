var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var mysql = require('mysql');
var express = require('express');

var client = mysql.createConnection({
	user: 'root',
	password: '1234',
	database: 'Company'
});

var app = express();
app.use(express.bodyParser());
app.use(app.router);

http.createServer(app).listen(52273, function(){
	console.log("Server running at http://127.0.0.1:52273");
});

app.get('/', function(request, response) {
	fs.readFile('list.html', 'utf8', function(error, data){
		client.query('SELECT * FROM products', function(error, results){
			response.send(ejs.render(data, {
				data: results
			}));
		});
	});
});

app.get('/delete/:id', function(request, response) {
	client.query('DELETE FROM products WHERE id=?', [request.param('id')], function(){
		response.redirect('/');
	});
});

app.get('/insert', function(request, response) {
	fs.readFile('insert.html', 'utf8', function(error, data){
		response.send(data);
	});
});

app.post('/insert', function(request, response) {
	var body = request.body;
	
	client.query('INSERT INTO products (name, modelnumber, series) VALUES (?, ?, ?)', [
		body.name, body.modelnumber, body.series
	], function(){
		response.redirect('/');
	});
});

app.get('/edit/:id', function(request, response) {
	fs.readFile('edit.html', 'utf8', function(error, data){
		client.query('SELECT * FROM products WHERE id = ?', [
			request.param('id')
		], function(error, result){
			response.send(ejs.render(data, {
				data:result[0]
			}));
		});
	});
});

app.post('/edit/:id', function(request, response) {
	var body = request.body;

	client.query('UPDATE products SET name=?, modelnumber=?, series=? WHERE id=?', [
		body.name, body.modelnumber, body.series, request.param('id')
	], function(){
		response.redirect('/');
	});
});


