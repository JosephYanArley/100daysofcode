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
	socket.emit('sprites_21', array_sprite);				//���������� ������ �������� ������������
    socket.broadcast.emit('sprites_21', array_sprite);		//���������� ������ ���� �������������. �������� ��� ����� ��������������
    socket.on('sprites_21', function (data) {
        if (socket.id in array_sprite) {					//���� �������� socket.id �������� ������� ����
            switch (data.command) {
                case 'up':									//������������ ��������
                    array_sprite[socket.id].y -= 10;
                    break;
                case 'down':
                    array_sprite[socket.id].y += 10;
                    break;
                case 'right':
                    array_sprite[socket.id].x += 10;
                    break;
                case 'left':
                    array_sprite[socket.id].x -= 10;
                    break;
            }
        } else {
            array_sprite[socket.id] = {							//����� ������� ������� � ���������� �������
                x: 225,
                y: 225
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
