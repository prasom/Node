var express = require('express');
var app = express();
var path = require('path');
var port = 8081;

var server = app.listen(port, function () {
	console.log('listening on port : ' + port);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/', function (request, response) {
	response.render('index');
});

var io = require('socket.io').listen(server);
 
// เมื่อมี client เข้ามาเชื่อมต่อให้ทำอะไร?
io.on('connection',function(socket){
	socket.on('chat',function(message){
		io.emit('chat',message);
	});
});