var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require('body-parser');
var routerapi = require('./router/routerapi');

const PORT = process.env.PORT || 3600;

/*
var http = require('http').Server(app);
var io = require('socket.io')(http);
*/

app.use(bodyParser.json());

app.use(express.static('APP'));

var path = __dirname + '/'

//manejador de rutas
router.use(function (req,res,next) {
  console.log("/" + req.method);
  next();
});

app.get("/",function(req,res){
	res.sendFile(path + 'index.html');
}); 

//Router de las solicitudes a Express-POS
app.use('/api', routerapi);

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "APP/views/404.html");
});

app.listen(PORT, function () {
	console.log('Servidor iniciado en el puerto ' + String(PORT));
});

/*
io.on('connection', function(socket){
	socket.on('chat message', function(msg,user){
	  io.emit('chat message', msg, user);
	});
});

http.listen(PORT, function(){
  console.log('listening on *:' + PORT);
});
*/

/*CODIGO PARA EL HTML Y SOCKET
   $(function () {
        var socket = io();
        $('form').submit(function(){
          socket.emit('chat message', $('#m').val());
          $('#m').val('');
          return false;
        });
        socket.on('chat message', function(msg){
          $('#messages').append($('<li>').text(msg));
          window.scrollTo(0, document.body.scrollHeight);
        });
      });
*/