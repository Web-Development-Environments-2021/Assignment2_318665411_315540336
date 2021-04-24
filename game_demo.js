let context;
let shape = new Object();
let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
let score;
let pac_color;
let start_time;
let time_elapsed;
let interval;
let users = []

$(document).ready(function() {
    context = (document.getElementById('canvas')).getContext("2d");
    Start();
})

function Start() {
    score = 0;
    pac_color = "yellow";
    let food_remain = 90;
    let pacman_remain = 1;
    start_time = new Date();
    while (food_remain > 0) {
        let emptyCell = findRandomEmptyCell(board);
        board[emptyCell[0]][emptyCell[1]] = 2;
        food_remain--;
    }
    let emptyCell = findRandomEmptyCell(board);
    shape.i = emptyCell[0]
    shape.j = emptyCell[1]
    board[emptyCell[0]][emptyCell[1]]=3
    keysDown = {};
    addEventListener(
        "keydown",
        function(e) {
            keysDown[e.keyCode] = true;
        },
        false
    );
    addEventListener(
        "keyup",
        function(e) {
            keysDown[e.keyCode] = false;
        },
        false
    );
    interval = setInterval(UpdatePosition, 100);
}

function findRandomEmptyCell(board) {
    let i = Math.floor(Math.random() * 14 + 1);
    let j = Math.floor(Math.random() * 14 + 1);
    while (board[i][j] === 0 || board[i][j] === 2) {
        i = Math.floor(Math.random() * 14 + 1);
        j = Math.floor(Math.random() * 14 + 1);
    }
    return [i, j];
}

function GetKeyPressed() {
    if (keysDown[38]) {
        return 1;
    }
    if (keysDown[40]) {
        return 2;
    }
    if (keysDown[37]) {
        return 3;
    }
    if (keysDown[39]) {
        return 4;
    }
}

function Draw() {
    canvas.width = canvas.width; //clean board
    lblScore.value = score;
    lblTime.value = time_elapsed;
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            let center = new Object();
            center.y = i * 40 + 20;
            center.x = j * 40 + 20;
            if (board[i][j] == 3) {
                context.beginPath();
                context.arc(center.x, center.y, 20, 0.1 * Math.PI, 1.85 * Math.PI); // half circle
                context.lineTo(center.x, center.y);
                context.fillStyle = pac_color; //color
                context.fill();
                context.beginPath();
                context.arc(center.x + 10/3, center.y - 10/3, 10/3, 0, 2 * Math.PI); // circle
                context.fillStyle = "black"; //color
                context.fill();
            } else if (board[i][j] == 2) {
                context.beginPath();
                context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle
                context.fillStyle = "red"; //color
                context.fill();
            } else if (board[i][j] == 0) {
                context.beginPath();
                context.rect(center.x - 20, center.y - 20, 40, 40);
                context.fillStyle = "grey"; //color
                context.fill();
            }
        }
    }
}

function UpdatePosition() {
    board[shape.i][shape.j] = 1;
    let x = GetKeyPressed();
    if (x == 1) {
        if (shape.j > 0 && board[shape.i-1][shape.j] != 0) {
            shape.i--;
        }
     }
     if (x == 2) {
         if (shape.j < 15 && board[shape.i+1][shape.j] != 0) {
             shape.i++;
         }
     }
     if (x == 3) {
         if (shape.i > 0 && board[shape.i][shape.j-1] != 0) {
             shape.j--;
         }
     }
     if (x == 4) {
         if (shape.i < 15 && board[shape.i][shape.j+1] != 0) {
             shape.j++;
         }
     }
     if (board[shape.i][shape.j] === 2) {
         score++;
     }
     board[shape.i][shape.j] = 3;
    let currentTime = new Date();
    time_elapsed = (currentTime - start_time) / 1000;
    if (score >= 20 && time_elapsed <= 10) {
        pac_color = "green";
    }
    if (score == 50) {
        window.clearInterval(interval);
        window.alert("Game completed");
    } else {
        Draw();
    }
}




