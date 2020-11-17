var socket = io()

socket.on("serverMsg", function(data){  //listens for server
    console.log(data.msg)
    console.log("id",data.information)
})

function randomInt(min, max) {
    return Math.floor(Math.random() * max) + min
}
