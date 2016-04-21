var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment  = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('User connected via socket.io!');
		

		//My solution
		
		//var now = moment();
// var timestamp = now.valueOf('x');
// var timestampMoment = moment.utc(timestamp);
// var time = timestampMoment.local().format('h:mm ');

	socket.on('message', function(message) {
	
		console.log('Message recieved: ' + message.text);
		
		message.timestamp = moment().valueOf();
		
		 // to send to everybody but not ourself
		//socket.broadcast.emit('message', message);
		// io.emit()... to send the message to everbody including ourself
		io.emit('message', message);
	});
	
	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat application',
		timestamp: moment().valueOf
	});
});

http.listen(PORT, function () {
	console.log('Server started!');
});
