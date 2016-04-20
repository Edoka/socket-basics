var socket = io();

socket.on('connect', function() {
	console.log('Connected to socket.io server!')
});

socket.on('message', function(message) {
	var momentTimestamp = moment.utc(message.timestamp);
	console.log('New message: ');
	console.log(message.text);
	
	jQuery('.messages').append('<p> <strong>' + momentTimestamp.local().format('h:mm a: ') + '</strong>' + message.text + '</p>');
})

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
		
		text: $message.val()
	});
	
	$message.val('');
	
});

