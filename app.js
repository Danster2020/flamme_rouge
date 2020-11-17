
var express = require("express");
var app = express();
var serv = require("http").Server(app);

app.get("/",function(req, res) {
    res.sendFile(__dirname + "/client/index.html");
});
app.use("/client", express.static(__dirname + "/client"));

serv.listen(2000);

console.log("Server started.")

var SOCKET_LIST = {}

var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    socket.id = Math.random()
    SOCKET_LIST[socket.id] = socket

    console.log('socket connection');
    console.log(socket.id)
 
	socket.emit('serverMsg',{
        msg:'hello',
        information: socket.id,
    });
    
 
});




// my shit

function randomInt(min, max) {
    return Math.floor(Math.random() * max) + min
}