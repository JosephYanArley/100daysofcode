var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var express = require('express');

app.use(express.static(__dirname + '/public_html/'));

app.get('/', function(req, res){
res.sendFile(__dirname + '/public_html/');
});

io.on('connection', function(socket){
  socket.on('socket_pack', function(msg){
    io.emit('socket_pack', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
