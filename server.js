const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');

// 處理靜態資源
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

var loggedUsers = {};
var messageHistory = {};

// 處理用戶連接
io.on('connection', function(socket) {
    console.log('A user connected');

    // 加入聊天室
    socket.on('join', function(data) {
        
        // 檢查使用者是否已經登入
        if (loggedUsers[data.username]) {
            socket.emit('loginFail'); // 發送登入失敗訊息給使用者
            return;
        }

        socket.join(data.room);
        socket.username = data.username;
        socket.room = data.room;
        
        loggedUsers[data.username] = true; // 將使用者標記為已登入
        console.log(data.username + ' joined ' + data.room);

        // 發送系統訊息給加入的用戶
        socket.emit('message', { username: 'System', message: 'Welcome to the chat room - ' + data.time});

        // 廣播系統訊息給房間內其他用戶
        socket.to(data.room).emit('message', { username: 'System', message: data.username + ' has joined the chat room - ' + data.time });

        // 顯示歷史訊息
        if (messageHistory[data.room]) {
            for (var i = 0; i < messageHistory[data.room].length; i++) {
                socket.emit('message', messageHistory[data.room][i]);
            }
        }
    });

    // 送出訊息
    socket.on('message', function(data) {
        
        // 儲存訊息到歷史訊息字典
        if (!messageHistory[socket.room]) {
            messageHistory[socket.room] = [{ username: data.username, message: data.message + " - " + data.time}];
        } else {
            messageHistory[socket.room].push({ username: data.username, message: data.message + " - " + data.time});
        }

        // 發送訊息給房間內的所有用戶
        io.to(data.room).emit('message', { username: data.username, message: data.message + " - " + data.time});
    });

    // 離開聊天室
    socket.on('disconnect', function() {
        console.log('A user disconnected');

        delete loggedUsers[socket.username]; // 從已登入使用者列表中移除該使用者

        // 廣播系統訊息給房間內其他用戶
        socket.to(socket.room).emit('message', { username: 'System', message: socket.username + ' has left the chat room - ' + new Date().toLocaleTimeString()});
    });
});

// 啟動伺服器
http.listen(3000, function() {
    console.log('Server listening on port 3000');
});
