process.on('exit', function(){
	console.log('안녕히 계세요..!');
});


process.exit();

process.emit('exit');
process.emit('exit');
process.emit('exit');
process.emit('exit');
process.emit('exit');

console.log('program running');
