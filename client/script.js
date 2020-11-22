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

board_coordinate_system = [
    [0, 0, "R1", 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

//board_coordinate_system[1][1] = 5
//document.getElementById("game_board_array").rows[0].cells[0].innerHTML = "R1"
//document.getElementById("game_board_array").rows[0].cells[0].style.background = "#ff9d85"


function indexOf2dArray(itemtofind) {
    array2d = board_coordinate_system
    index = [].concat.apply([], ([].concat.apply([], array2d))).indexOf(itemtofind);
                
    // return "false" if the item is not found
    if (index === -1) { return false; }
    
    // Use any row to get the rows' array length
    // Note, this assumes the rows are arrays of the same length
    numColumns = array2d[0].length;
    
    // row = the index in the 1d array divided by the row length (number of columns)
    row = parseInt(index / numColumns);
    
    // col = index modulus the number of columns
    col = index % numColumns;
    
    console.log(board_coordinate_system)
    console.log([row, col])
    return [row, col]; 
}

function updateBoardState() { // not finished
    var position_to_update = indexOf2dArray("R1")
    document.getElementById("game_board_array").rows[0].cells[0].innerHTML = "R1"
    document.getElementById("game_board_array").rows[0].cells[0].style.background = "#ff9d85"
}

updateBoardState()


function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min
}





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }