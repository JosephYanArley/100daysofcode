//var express = require('express');
//var app = express();
//var http = require('http').Server(app);
//var io = reqiure('socket.io')(http);
//app.set('port', (process.env.PORT || 5000));

//app.get('/', function(req, res){
//res.sendFile(__dirname + '/public_html/index.html');
//});

//io.on('connection', function(socket){
//  socket.on('chat message', function(msg){
//    io.emit('chat message', msg);
//  });
//});

//app.listen(app.get('port'), function() {
//  console.log('Node app is running on port', app.get('port'));
//});

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
res.sendFile(__dirname + '/public_html/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
