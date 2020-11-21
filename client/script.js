var socket = io()

socket.on("serverMsg", function(data){  //listens for server
    console.log(data.msg)
    console.log("id",data.information)
})


socket.on("connect", function() {
    console.log("Connected!")
    var div = document.getElementById("server-connection")
    div.innerHTML = "Connected"
    div.style.color = "green"
})

socket.on("disconnect", function() {
    console.log("Connection lost!")
    var div = document.getElementById("server-connection")
    div.innerHTML = "Disconnected"
    div.style.color = "red"
})

/*
    var div = document.getElementById("server-connection")

    console.log("Disconnected")
    if (socket.connected == true) {
        div.innerHTML = "Connected"
        div.style.color = "green"
        sleep(5000)
    } else {
        div.innerHTML = "Disconnected"
        div.style.color = "red"
    }
*/



function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min
}





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }