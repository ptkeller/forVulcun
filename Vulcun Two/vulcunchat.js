var express = require('express');
var app = express();
var port = process.env.PORT || 8100;
var server = app.listen(port);
var io = require('socket.io').listen(server);

server.listen(port, function(){
  console.log('listening on port...', port);
});
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res){
  res.sendFile(__dirname +'/public/index.html')
})
// Connect socket
io.on('connection', function (socket){
  console.log('user connected')
  socket.on('sending', function(x){
    console.log(x)
   io.emit('sent', x);  
  })
});
var socketConnect = function(){ 
  var socket = io();
  socket.emit('connecting');
}