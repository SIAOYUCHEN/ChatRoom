# 如何使用
node server.js

開啟2個瀏覽器分頁輸入 http://127.0.0.1:3000/index.html
即可使用

https://github.com/RexHung0302/Socketio-Server/assets/11059938/f30dcbe4-d6fc-44bf-94c6-e5268cf123bc


# 前端框架
1. Jqery
2. Html

# 後端框架與套件
1. Express
2. Socket.io

# 完成功能
1. 一對一聊天
2. 群組聊天
3. 傳送時間
4. 歷史訊息
5. 禁止使用者重複進入


# 思路解釋
因為未實作上線列表，因現有產品在點選朋友列表時會得知房間號碼而進行一對一通訊採用類似概念去完成。多用一個欄位當成房間號碼進行相關通訊，如要一對一時輸入相同號碼進行通訊，如要多人聊天則選用其他號碼進行相關通訊。
歷史訊息採用程式內Dictionary去記錄完成和顯示，未來可改用Redis進行存取也可達到所謂的TTL。


# Chatgpt問題

Q :  我想完成一個聊天室條件功能如下
1. 前端採用jquery and html
2. 後端採用express框架
3. 功能一對一聊天
4. 輸入使用者名稱
5. 輸入房間名稱
6. 加入聊天室
7. 離開聊天室
8. 送出訊息
9. 顯示收到訊息
10. 使用socket.io套件

Q : script.js文件應該放哪裡

Q : server.js發現因為房間名稱不一樣造成無法接收訊息，請幫我修改此錯誤

Q : server.js中得知哪位使用者離開，不要用getUsername函示請幫我修正

Q : index.html 中<title>Chat Room</title>請幫我修正可以根據輸入的房間名稱做更改

Q : 請教我動態改變文字大小

Q : server.js中重複使用者可以重複登入請幫我修改

Q : server.js中請幫我用dictionary方式記錄歷史訊息主鍵為房間名稱值為歷史訊息，重新加入房間時顯示歷史訊息

Q : server.js中自己輸入的訊息也要顯示，請幫我修正



