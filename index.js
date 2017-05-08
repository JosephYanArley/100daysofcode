var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var express = require('express');

app.use(express.static(__dirname + '/public_html/'));

app.get('/', function(req, res){
res.sendFile(__dirname + '/public_html/');
});

var array_sprite = {};

io.on('connection', function(socket){
  socket.on('socket_pack', function(msg){
    io.emit('socket_pack', msg);
  });
	socket.emit('sprites_21', array_sprite);				//отправляем массив текущему пользователю
    socket.broadcast.emit('sprites_21', array_sprite);		//отправляем массив всем пользователям. Загрузка для вновь подключившихся
    socket.on('sprites_21', function (data) {
        if (socket.id in array_sprite) {					//если свойство socket.id элемента массива есть
            								//отрабатываем движение
            array_sprite[socket.id].y = data.y;
            array_sprite[socket.id].x = data.x;

        } else {
            array_sprite[socket.id] = {							//иначе создаем элемент с начальными данными
                x: 0,
                y: 0
            };
        }
        socket.broadcast.emit('sprites_21', array_sprite);
    });

    socket.on('disconnect', function(){
        delete array_sprite[socket.id];
        socket.broadcast.emit('sprites_21', array_sprite);
    });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
