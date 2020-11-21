
var express = require("express");
var app = express();
var serv = require("http").Server(app);

app.get("/",function(req, res) {
    res.sendFile(__dirname + "/client/index.html");
});
app.use("/client", express.static(__dirname + "/client"));

serv.listen(2000, "0.0.0.0");

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

    socket.on("disconnect", function() {
        delete SOCKET_LIST[socket.id]
        console.log("player:", socket.id, "left")
    })
    
 
});

setInterval(function() {
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i]
        socket.emit("connection", {
            connection_status: "connected",
        })
    }
    
}, 1000/25)



// my shit

function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min
}