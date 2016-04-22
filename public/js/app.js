var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();

console.log(name + 'joined ' + room);
var $roomtitle = jQuery('.room-title');
$roomtitle.append(room);
socket.on('connect', function() {
	console.log('Connected to socket.io server!');
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function(message) {
	var momentTimestamp = moment.utc(message.timestamp);

	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');

	console.log('New message: ');
	console.log(message.text);
	
	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a: ') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
	$messages.append($message);
});

//Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();

	// --- My solution
	// var now = moment();
	//
	// var timestamp = now.valueOf('x');
	// var timestampMoment = moment.utc(timestamp);
	// var time = timestampMoment.local().format('h:mm ')

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		//--- My solution
		// text: time + ' ' + $message.val()

		name : name,
		text : $message.val()
	});

	$message.val('');

});

