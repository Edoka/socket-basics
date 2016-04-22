var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment  = require('moment');

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function (socket) {
	console.log('User connected via socket.io!');
	
	socket.on('disconnect', function () {
		var userData = clientInfo[socket.id];
		
		if (typeof userData !== 'undefined'){
			socket.leave(userData.room);
			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left!',
				timestamp: moment().valueOf()
			});
			delete userData;
		}
	});
	
	socket.on('joinRoom', function(req) {
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment().valueOf()
		});
	});
		

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
		io.to(clientInfo[socket.id].room).emit('message', message); //add to() this emit the message only to pple in the room
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
