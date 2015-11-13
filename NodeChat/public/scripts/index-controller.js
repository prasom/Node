// 
var socket = io();

var username = Math.floor(Math.random() * 100 + 1);
var chatForm = $('#chat-form');
var chatHistory = $('#chat-history');
var inputMessage = $('chat-message');

inputMessage.focus();
socket.emit('chat', {
	username: username,
	message: username + " has been connected."
});

chatForm.submit(function () {
	socket.emit('chat', {
		username: username,
		message: inputMessage.val()
	});

	$(this)[0].reset();
	return false;
});

socket.on('chat', function (data) {
	if (data.username == username) {
		chatHistory.append($('<li class="message mesage--me" >').text(data.message));
	} else {
		chatHistory.append($('<li class="message" >').text(data.username + ':' + data.message));
	}
	
	//chatHistory[0].scrollTop = chatHistory[0].scrollHeight;
});
