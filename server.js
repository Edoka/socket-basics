var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('User connected via socket.io!');
	
	socket.on('message', function(message) {
		console.log('Message recieved: ' + message.text);
		
		 // to send to everybody but not ourself
		//socket.broadcast.emit('message', message);
		// io.emit()... to send the message to everbody including ourself
		io.emit('message', message);
	});
	
	socket.emit('message', {
		text: 'Welcome to the chat application2'
	});
});

http.listen(PORT, function () {
	console.log('Server started!');
});
