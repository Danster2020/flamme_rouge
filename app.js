
var express = require("express");
var app = express();
var serv = require("http").Server(app);

app.get("/",function(req, res) {
    res.sendFile(__dirname + "/client/index.html");
});
app.use("/client", express.static(__dirname + "/client"));

var server_port = 2000;
serv.listen(server_port);

console.log("Server started on localhost:", server_port)

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

// my shit
board_coordinate_system = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

class Player {
    constructor(id, sprinter_pos, runner_pos) {
        this.id = id
        this.sprinter_pos = sprinter_pos
        this.runner_pos = runner_pos
    }
}


function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min
}

//

setInterval(function() {
    for (var i in SOCKET_LIST) {
        var socket = SOCKET_LIST[i]
        socket.emit("connection", {
            connection_status: "connected",
        })
    }
    
}, 1000/25)



