var express = require('express');
var app = express();
var port = process.env.PORT || 8100;
var http = require('http');
var redis = require('socket.io-redis');
var cluster = require('cluster');
var cpus = require('os').cpus().length;


if(cluster.isMaster){
  var Server = http.createServer();
  var io = require('socket.io').listen(Server);
  // io.adapter(redis( {host: 'localhost', port: 6379 }));

  for(var i = 0; i < cpus; i++){
    cluster.fork();
  }
  cluster.on('fork', function(worker){
    console.log('created a worker ', worker.id)
  })
  cluster.on('exit', function(worker, code, signal){
    console.log('worker ' + worker.process.pid + ' died');
  })
} 

if(cluster.isWorker){
  http.globalAgent.maxSockets = 10000;
  var server = http.createServer(app).listen(port)
  var io = require('socket.io').listen(server);
  // io.adapter(redis( {host: 'localhost', port: 6379 }));

  app.use(express.static(__dirname + '/public'));

  app.get('/', function(req, res){
    res.sendFile(__dirname +'/public/index.html')
  })

  //Blocked word list
  var blockedChat = ['between', 'big', 'bird', 'birth', 'birthday', 'bit', 'bite', 'both', 'bottle', 'bottom', 'bowl', 'box', 'boy', 'football', 'for', 'force', 'foreign', 'forest', 'listen', 'little', 'live', 'lock', 'lonely', 'long', 'look', 'lose', 'lot', 'love', 'low', 'lower', 'luck', 'machine', 'main', 'make', 'male', 'man', 'many', 'map', 'mark', 'market', 'marry', 'matter', 'may', 'me', 'meal', 'mean', 'measure', 'meat', 'medicine', 'meet', 'member', 'mention', 'method', 'seven', 'several', 'sex', 'shade', 'shadow', 'shake', 'shape', 'share', 'sharp', 'shout', 'tear', 'telephone', 'television', 'tell', 'ten', 'tennis', 'terrible', 'test', 'than', 'that', 'the', 'their', 'then', 'there', 'therefore', 'these', 'thick', 'thin', 'thing', 'think', 'third', 'wet', 'what', 'wheel', 'when', 'where', 'which', 'while', 'white', 'who', 'why', 'wide', 'wife', 'wild', 'will', 'win', 'wind']
  //Regex to search for blocked text
  var regex = new RegExp('\\b(' + blockedChat.join('|') + ')\\b', 'i');

  // Connect socket
  io.on('connection', function (socket){
    socket.on('sending', function(user, message){
      if(regex.test(message)){
        message = '****';
      }
      io.emit('sent', user, message);  
    })
  });
  var socketConnect = function(){ 
    var socket = io();
    socket.emit('connecting');
  }
}
