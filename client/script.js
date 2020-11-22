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

// error if not all bikes from biker_list are on the board
board_coordinate_system = [
    ["R1", 0, 0, 0, 0, "R3"],
    ["S1", 0, "R2", "S3", 0, "S2"]
]

biker_list = ["R1", "S1", "R2", "S2", "R3", "S3"]

//board_coordinate_system[1][1] = 5
//document.getElementById("game_board_array").rows[0].cells[0].innerHTML = "R1"
//document.getElementById("game_board_array").rows[0].cells[0].style.background = "#ff9d85"


function indexOf2dArray(biketofind) {
    array2d = board_coordinate_system
    index = [].concat.apply([], ([].concat.apply([], array2d))).indexOf(biketofind);
                
    // return "false" if the item is not found
    if (index === -1) { return false; }
    numColumns = array2d[0].length;
    row = parseInt(index / numColumns);
    col = index % numColumns;
    
    //console.log("row:", row, "col:", col)
    return [row, col]; 
}

function updateBoardState() { // not finished
    
    // rensar alla tomma rutor
    ar = board_coordinate_system
    for (var i = 0, len = ar.length; i < len; i++) {
        for (var j = 0, len2 = ar[i].length; j < len2; j++) {
            if (ar[i][j] == 0) {
                board_target_cell = document.getElementById("game_board_array").rows[i].cells[j]
                board_target_cell.innerHTML = ""
                board_target_cell.style.background = "white"  // red
            }
        }
    }

    // for every bike on the field
    arrayLength = biker_list.length;
    for (var i = 0; i < arrayLength; i++) {
        bike = biker_list[i]

        position_to_update = indexOf2dArray(bike)
        row = position_to_update[0]
        column = position_to_update[1]

        // updates visual position
        board_target_cell = document.getElementById("game_board_array").rows[row].cells[column]
        board_target_cell.innerHTML = bike

        // sets color
        if (bike.includes("1") == true) {
            board_target_cell.style.background = "#ff9d85"  // player 1 red
        }
        if (bike.includes("2") == true) {
            board_target_cell.style.background = "#78acff"  // player 2 blue
        }
        if (bike.includes("3") == true) {
            board_target_cell.style.background = "#ffcf4a"  // player 3 yellow
        }
        
    }
    //console.log(board_coordinate_system)
}

function moveBike(bike, steps) {
    coordinates = indexOf2dArray(bike)
    row = coordinates[0]
    column = coordinates [1]
    steps = steps

    new_column = column + steps
    new_row = row

    if (board_coordinate_system[new_row][new_column] != 0) {  // if new position is occupied
        if (row == 0 && board_coordinate_system[new_row +1 ][new_column] != 0) { // if new positions left lane is occupied
            new_column -= 1
            console.log("both lanes occupied, moving back 1 step")
        } else {
            new_row -= 1
            console.log("right lane is occupied, moving to left lane")
            
            // play sound
            myAudio = new Audio('/client/sound/bike_bell.wav');
            myAudio.play();
        }
    }

    // if the bikes position is in the left lane and the right lane is free
    if (row == 0 && board_coordinate_system[row+1][new_column] == 0) {
        new_row += 1
    }

    new_coordinates = [new_row, new_column]

    board_coordinate_system[row][column] = 0  // remove old bike position
    board_coordinate_system[new_row][new_column] = bike  // set new bike position

    //console.log("old pos:", coordinates)
    //console.log("new pos:", new_coordinates)
    //console.log(board_coordinate_system)
    updateBoardState()
}

//moveBike("R1", 2)
updateBoardState()


function randomNumber(min, max) {
    return Math.floor(Math.random() * max) + min
}





function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }