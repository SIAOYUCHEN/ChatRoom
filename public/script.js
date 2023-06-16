$(function() {
    var socket = io();

    // 加入聊天室
    $('#join-btn').click(function() {
        var username = $('#username').val();
        var room = $('#room').val();
        var currentTime = new Date().toLocaleTimeString(); // 獲取當前時間

        if (username && room) {
            socket.emit('join', { username: username, room: room, time: currentTime });
            $('#login-form').hide();
            $('#chat-room').show();
            $('#title').text('Chat Room - ' + room);
            $("#title").css("font-size", "28px");
        }
    });

    // 送出訊息
    $('#send-btn').click(function() {
        var message = $('#message').val();
        var username = $('#username').val();
        var room = $('#room').val();
        var currentTime = new Date().toLocaleTimeString(); // 獲取當前時間
        
        if (message) {
            socket.emit('message', { message: message, room: room, username: username, time: currentTime});
            $('#message').val('');
        }
    });

    // 顯示收到的訊息
    socket.on('message', function(data) {
        $('#message-box').append('<p>' + data.username + ': ' + data.message + '</p>');
    });

    // 離開聊天室
    socket.on('leave', function() {
        $('#login-form').show();
        $('#chat-room').hide();
    });

    //重複使用者
    socket.on('loginFail', function() {
        alert("此使用者已經登入此對話");
        $('#login-form').show();
        $('#chat-room').hide();
    });
});
