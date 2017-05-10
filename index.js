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

  socket.emit('spheres_on', array_sprite);

  socket.on('spheres_out', function (data) {
        array_sprite[socket.id] = data;
        socket.broadcast.emit('spheres_in', array_sprite);
  });

  socket.on('disconnect', function(){
    delete array_sprite[socket.id];
    socket.broadcast.emit('spheres_in', array_sprite);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
