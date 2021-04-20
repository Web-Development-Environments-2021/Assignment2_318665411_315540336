let context;
let shape = new Object();
let board;
let score;
let pac_color;
let start_time;
let time_elapsed;
let interval;
let canvas;
let users = []


class User{
	constructor(user_name,first_name,last_name,email,password,birthday) {
		this.user_name = user_name
		this.first_name = first_name
		this.last_name = last_name
		this.email = email
		this.password = password
		this.birthday = birthday
	}
}

 $(document).ready(function() {
	 let k_user = new User('k','k','k','k@gmail.com','k','1/1/1970')
	 users.push(k_user)
	 console.log(k_user)
 	//context = canvas.getContext("2d");
	 $.validator.addMethod("lettersonly", function(value, element) {
		 return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
	 });
	 $.validator.addMethod("lettersanddigits", function(value, element) {
		 return this.optional(element) || /^(?=.*[A-Za-z])(?=.*\d)/.test(value);
	 });
	 $("#register_form").validate({
			 rules: {
				 uname: {
					 required: true,
				 },
				 fname: {
					 required: true,
					 lettersonly: true
				 },
				 lname: {
					 required: true,
					 lettersonly: true
				 },
				 email: {
					 required: true,
					 email: true
				 },
				 password: {
					 required: true,
					 minlength: 6,
					 lettersanddigits: true
				 },
				 datepicker: {
					 required: true
				 }
			 },
			 messages: {
				 uname: {
					 required: "Please enter your username"
				 },
				 fname: {
					 required: "Please enter your first name",
					 lettersonly: "First name should include letters only"
				 },
				 lname: {
					 required: "Please enter your last name",
					 lettersonly: "Last name should include letters only"
				 },
				 email: {
					 required: "Please enter your email",
					 email: "The email should be in the format: example@example.com"
				 },
				 password: {
					 required: "Please enter a password",
					 minlength: "Password should be at least 6 characters",
					 lettersanddigits: "Password should include both letters and digits"
				 },
				 datepicker: {
					 required: "Please choose your date of birth"
				 }
			 }
		 })

	 $("#login_form").validate({
		 rules:{
		 	uname:{
		 		required:true,
			},
			password:{
		 		required:true,
			}
		 }
	 })
	 	// if ($("input:password").val.length < 6){
		// 	alert('error')
		// 	return false
		// }

 	//Start();
 });

//
// function Start() {
// 	board = new Array();
// 	score = 0;
// 	pac_color = "yellow";
// 	var cnt = 100;
// 	var food_remain = 50;
// 	var pacman_remain = 1;
// 	start_time = new Date();
// 	for (var i = 0; i < 10; i++) {
// 		board[i] = new Array();
// 		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
// 		for (var j = 0; j < 10; j++) {
// 			if (
// 				(i == 3 && j == 3) ||
// 				(i == 3 && j == 4) ||
// 				(i == 3 && j == 5) ||
// 				(i == 6 && j == 1) ||
// 				(i == 6 && j == 2)
// 			) {
// 				board[i][j] = 4;
// 			} else {
// 				var randomNum = Math.random();
// 				if (randomNum <= (1.0 * food_remain) / cnt) {
// 					food_remain--;
// 					board[i][j] = 1;
// 				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
// 					shape.i = i;
// 					shape.j = j;
// 					pacman_remain--;
// 					board[i][j] = 2;
// 				} else {
// 					board[i][j] = 0;
// 				}
// 				cnt--;
// 			}
// 		}
// 	}
// 	while (food_remain > 0) {
// 		var emptyCell = findRandomEmptyCell(board);
// 		board[emptyCell[0]][emptyCell[1]] = 1;
// 		food_remain--;
// 	}
// 	keysDown = {};
// 	addEventListener(
// 		"keydown",
// 		function(e) {
// 			keysDown[e.keyCode] = true;
// 		},
// 		false
// 	);
// 	addEventListener(
// 		"keyup",
// 		function(e) {
// 			keysDown[e.keyCode] = false;
// 		},
// 		false
// 	);
// 	interval = setInterval(UpdatePosition, 250);
// }
//
// function findRandomEmptyCell(board) {
// 	var i = Math.floor(Math.random() * 9 + 1);
// 	var j = Math.floor(Math.random() * 9 + 1);
// 	while (board[i][j] != 0) {
// 		i = Math.floor(Math.random() * 9 + 1);
// 		j = Math.floor(Math.random() * 9 + 1);
// 	}
// 	return [i, j];
// }
//
// function GetKeyPressed() {
// 	if (keysDown[38]) {
// 		return 1;
// 	}
// 	if (keysDown[40]) {
// 		return 2;
// 	}
// 	if (keysDown[37]) {
// 		return 3;
// 	}
// 	if (keysDown[39]) {
// 		return 4;
// 	}
// }
//
// function Draw() {
// 	canvas.width = canvas.width; //clean board
// 	lblScore.value = score;
// 	lblTime.value = time_elapsed;
// 	for (var i = 0; i < 10; i++) {
// 		for (var j = 0; j < 10; j++) {
// 			var center = new Object();
// 			center.x = i * 60 + 30;
// 			center.y = j * 60 + 30;
// 			if (board[i][j] == 2) {
// 				context.beginPath();
// 				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
// 				context.lineTo(center.x, center.y);
// 				context.fillStyle = pac_color; //color
// 				context.fill();
// 				context.beginPath();
// 				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
// 				context.fillStyle = "black"; //color
// 				context.fill();
// 			} else if (board[i][j] == 1) {
// 				context.beginPath();
// 				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
// 				context.fillStyle = "black"; //color
// 				context.fill();
// 			} else if (board[i][j] == 4) {
// 				context.beginPath();
// 				context.rect(center.x - 30, center.y - 30, 60, 60);
// 				context.fillStyle = "grey"; //color
// 				context.fill();
// 			}
// 		}
// 	}
// }
//
// function UpdatePosition() {
// 	board[shape.i][shape.j] = 0;
// 	var x = GetKeyPressed();
// 	if (x == 1) {
// 		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
// 			shape.j--;
// 		}
// 	}
// 	if (x == 2) {
// 		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
// 			shape.j++;
// 		}
// 	}
// 	if (x == 3) {
// 		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
// 			shape.i--;
// 		}
// 	}
// 	if (x == 4) {
// 		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
// 			shape.i++;
// 		}
// 	}
// 	if (board[shape.i][shape.j] == 1) {
// 		score++;
// 	}
// 	board[shape.i][shape.j] = 2;
// 	var currentTime = new Date();
// 	time_elapsed = (currentTime - start_time) / 1000;
// 	if (score >= 20 && time_elapsed <= 10) {
// 		pac_color = "green";
// 	}
// 	if (score == 50) {
// 		window.clearInterval(interval);
// 		window.alert("Game completed");
// 	} else {
// 		Draw();
// 	}
// }

function go_to_reg(){
	$("body").css("background-color","rgb(30,30,40)")
	$("#Welcome").hide()
	$("#Welcome").css("visibility","hidden")
	$("#Register").show()
	$("#Register").css("visibility","visible")
}

function go_to_login(){
	$("body").css("background-color","rgb(30,30,40)")
	$("#Welcome").hide()
	$("#Welcome").css("visibility","hidden")
	$("#Login").show()
	$("#Login").css("visibility","visible")
}

function validate_vals(){
	let username = $('#username').val()
	let password = $('#login_password').val()
	let user = users.find((u)=>{
		return u.user_name === username && u.password === password
	})

	if (user === undefined){
		$("#warning_message").css('visibility','visible')
		return false
	}
	else{
		$("#Login").hide()
		$("#Login").css("visibility","hidden")
		$("#Game").show()
		$("#Game").css("visibility","visible")
	}
	return false
}

function add_user(){
	if ($("#register_form").validate().checkForm()){
		let user = new User($("#uname").val(),$("#fname").val(),$('#lname').val(),$('#email').val(),$('#password').val(),$('#datepicker').val())
		users.push(user)
		console.log(user);
		$("#Register").hide()
		$("#Register").css("visibility","hidden")
		$("#Game").show()
		$("#Game").css("visibility","visible")
	}
	return false
}

