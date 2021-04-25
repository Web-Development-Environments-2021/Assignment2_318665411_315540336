let context;
let shape = new Object();
let board = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
	[0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
	[0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0],
	[0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0],
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
let options=['1','2','3','4','5','6','7','8','9','0','a','b','c',
			'd','c','d','e','f','g','h','i','j','k','l','m','n',
			'o','p','q','s','t','u','v','w','x','y','z','Arrowup',
			'Arrowdown','Arrowleft','Arrowright' ]


let up_code
let down_code
let right_code
let left_code
let start = 0.1
let end = 1.85
let dir = false
let eye_x = 3
let eye_y = -10
let ball_numbers
let small_color
let medium_color
let big_color
let monster_number
let mySound
const urls = [[1,1,'inky.gif'], [1,13,'blinky.gif'], [13,1,'pinky.gif'], [13,13,'clyde.gif']]
let monster_move = 1
let monsters = []
let life = 5
let dog;

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

class Monster{
	constructor(x_coor,y_coor,last_cell,url) {
		this.img = new Image(40,40)
		this.img.src = url
		this.last_c = last_cell
		this.x = x_coor
		this.y = y_coor
	}
}

$(document).ready(function() {
	let k_user = new User('k','k','k','k@gmail.com','k','1/1/1970')
	users.push(k_user)
	context = (document.getElementById('canvas')).getContext("2d");
	$.validator.addMethod("lettersonly", function(value, element) {
		return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
	});
	$.validator.addMethod("lettersanddigits", function(value, element) {
		return this.optional(element) || /^(?=.*[A-Za-z])(?=.*\d)/.test(value);
	});
	$.validator.addMethod("unique_username", function(value, element) {
		return this.optional(element) || users.find((user)=>{
			return user.user_name === value
		}) === undefined;
	});
	$("#register_form").validate({
		rules: {
			uname: {
				required: true,
				unique_username: true
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
				required: "Please enter your username",
				unique_username: 'username in use'
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
	load_key_options()
});


function Start() {
	score = 0;
	pac_color = "yellow";
	let food_remain = ball_numbers;
	let pacman_remain = 1;
	start_time = new Date();
	while (food_remain > 0) {
		let distribution = [2,2,2,2,2,2,3,3,3,4]
		let emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = distribution[Math.floor(Math.random()*distribution.length)];
		food_remain--;
	}
	locate_pacman()
	for(let i = 0; i < monster_number;i++){
		let mon = new Monster(urls[i][0],urls[i][1],board[urls[i][0]][urls[i][1]],urls[i][2])
		board[urls[i][0]][urls[i][1]] = 6
		monsters.push(mon)
	}
	dog = new Monster(6,7,board[6][7],'dogo.gif')
	board[6][7] = 7
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
	// mySound = new Audio('among.mpeg')
	// mySound.start()
	interval = setInterval(UpdatePosition, 100);
}

function findRandomEmptyCell(board) {
	let i = Math.floor(Math.random() * 14 + 1);
	let j = Math.floor(Math.random() * 14 + 1);
	while (board[i][j] === 0 || (board[i][j] >= 2 && board[i][j] <= 4)) {
		i = Math.floor(Math.random() * 14 + 1);
		j = Math.floor(Math.random() * 14 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[up_code]) {
		return 1;
	}
	if (keysDown[down_code]) {
		return 2;
	}
	if (keysDown[left_code]) {
		return 3;
	}
	if (keysDown[right_code]) {
		return 4;
	}
}

function Draw(start,end,dir,x_eye,y_eye) {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	let monst = 0;
	for (let i = 0; i < 15; i++) {
		for (let j = 0; j < 15; j++) {
			let center = new Object();
			center.y = i * 40 + 20;
			center.x = j * 40 + 20;
			if (board[i][j] == 5) {
				context.beginPath();
				context.arc(center.x, center.y, 20, start * Math.PI, end * Math.PI,dir); // half circle
				context.lineTo(center.x, center.y);
				context.closePath()
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + x_eye, center.y + y_eye, 3, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 8, 0, 2 * Math.PI); // circle
				context.fillStyle = small_color; //color
				context.fill();
				context.beginPath();
				context.fillStyle = "black";
				context.fillText("5", center.x-3, center.y+4);
			} else if (board[i][j] == 3) {
				context.beginPath();
				context.arc(center.x, center.y, 11, 0, 2 * Math.PI); // circle
				context.fillStyle = medium_color; //color
				context.fill();
				context.beginPath();
				context.fillStyle = "black";
				context.fillText("15", center.x-5, center.y+4);
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.arc(center.x, center.y, 13, 0, 2 * Math.PI); // circle
				context.fillStyle = big_color; //color
				context.fill();
				context.beginPath();
				context.fillStyle = "black";
				context.fillText("25", center.x-5, center.y+5);
			} else if (board[i][j] == 0) {
				context.beginPath();
				context.rect(center.x - 20, center.y - 20, 40, 40);
				context.fillStyle = "grey"; //color
				context.fill();
			}
			else if (board[i][j] == 6){
				let m = monsters.find((elem)=>{
					return elem.x === i && elem.y === j
				})
				context.drawImage(m.img,center.x-20,center.y-20,m.img.width,m.img.height)
				monst++
			}
			else if (board[i][j] == 7){
				context.drawImage(dog.img,center.x-20,center.y-20,dog.img.width,dog.img.height)
			}
		}
	}
}

function UpdatePosition() {
	let busted = false
	board[shape.i][shape.j] = 1;
	let x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i-1][shape.j] != 0) {
			shape.i--;
			start = 1.6
			end = 1.35
			dir = false
			eye_x = -10
			eye_y = 3
		}
	}
	if (x == 2) {
		if (shape.j < 15 && board[shape.i+1][shape.j] != 0) {
			shape.i++;
			start = 0.4
			end = 0.65
			dir = true
			eye_x = -10
			eye_y = 3
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i][shape.j-1] != 0) {
			shape.j--;
			start = 0.9
			end = 1.15
			dir = true
			eye_x = 3
			eye_y = -10
		}
	}
	if (x == 4) {
		if (shape.i < 15 && board[shape.i][shape.j+1] != 0) {
			shape.j++;
			start = 0.1
			end = 1.85
			dir = false
			eye_x = 3
			eye_y = -10
		}
	}
	if (monster_move === 4){
		for(let i = 0; i < monster_number; i++){
			let moves = allowed_moves(monsters[i].x,monsters[i].y)
			let chosen = shortest_path(moves)
			board[monsters[i].x][monsters[i].y] = monsters[i].last_c
			monsters[i].last_c = board[chosen[0]][chosen[1]]
			monsters[i].x = chosen[0]
			monsters[i].y = chosen[1]
			board[chosen[0]][chosen[1]] = 6
			if (shape.i == monsters[i].x && shape.j == monsters[i].y){
				window.alert('busted')
				reset_monsters()
				locate_pacman()
				life--
				score-=10
				break
			}
		}
		if (dog !== undefined){
			let moves = allowed_moves(dog.x,dog.y)
			let chosen = moves[Math.floor(Math.random() * moves.length)]
			board[dog.x][dog.y] = dog.last_c
			dog.last_c = board[chosen[0]][chosen[1]]
			dog.x = chosen[0]
			dog.y = chosen[1]
			board[chosen[0]][chosen[1]] = 7
		}
		monster_move = 0
	}
	monster_move++

	if (dog !== undefined && dog.x == shape.i && dog.y == shape.j){
		score+=50
		board[dog.x][dog.y] = dog.last_c
		dog = undefined
	}
	if (board[shape.i][shape.j] === 2) {
		score+=5;
		ball_numbers--
	}
	if (board[shape.i][shape.j] === 3) {
		score+=15;
		ball_numbers--
	}
	if (board[shape.i][shape.j] === 4) {
		score+=25;
		ball_numbers--
	}
	board[shape.i][shape.j] = 5;
	time_elapsed = time_elapsed-0.1;
	if (life === 0){
		window.clearInterval(interval);
		window.alert("Loser!");
	}
	if (time_elapsed <= 0){
		window.clearInterval(interval);
		window.alert("Times Up!");
	}
	else if (ball_numbers == 0) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw(start,end,dir,eye_x,eye_y);
	}
}

function go_to_reg(){
	$(".content").css("display","none")
	$("#Register").css("display","block")
}

function go_to_login(){
	$(".content").css("display","none")
	$("#Login").css("display","block")
}

function go_to_home(){
	$(".content").css("display","none")
	$("#Welcome").css("display","block")
}

function start_game(){
	$(".content").css("display","none")
	$("#Game_Area").css("display","block")
	get_controls()
	Start()
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
		$(".content").css("display","none")
		$("#settings").css("display","block")
		$('.settings_content')[0].reset()
	}
	return false
}

function add_user(){
	if ($("#register_form").validate().checkForm()){
		let user = new User($("#uname").val(),$("#fname").val(),$('#lname').val(),$('#email').val(),$('#password').val(),$('#datepicker').val())
		users.push(user)
		$(".content").css("display","none")
		$("#Welcome").css("display","block")
	}
	return false
}


function load_key_options(){
	let up = document.getElementById('upkey')
	let down = document.getElementById('downkey')
	let right = document.getElementById('rightkey')
	let left = document.getElementById('leftkey')
	options.forEach((val,ind)=>{
		let opt1 = document.createElement('option')
		let opt2 = document.createElement('option')
		let opt3 = document.createElement('option')
		let opt4 = document.createElement('option')
		opt1.text = val;
		opt1.value = ind;
		opt2.text = val;
		opt2.value = ind;
		opt3.text = val;
		opt3.value = ind;
		opt4.text = val;
		opt4.value = ind;
		up.appendChild(opt1);
		down.appendChild(opt2);
		right.appendChild(opt3);
		left.appendChild(opt4);
	})
}

function set_settings(){
	$('#upkey').val("37")
	$('#downkey').val("38")
	$('#rightkey').val("40")
	$('#leftkey').val("39")
	let min = $( "#slider-range-max" ).slider("option","min")
	let max = $( "#slider-range-max" ).slider("option","max")
	let val = min + Math.floor(Math.random()*(max-min))
	$( "#slider-range-max" ).slider('value',val)
	$('#amount').val(val)
	$("#ball1").spectrum({
		type:'color',
		color: '#' + Math.floor(Math.random()*16777215).toString(16)
	});
	$("#ball2").spectrum({
		type:'color',
		color: '#' + Math.floor(Math.random()*16777215).toString(16)
	});
	$("#ball3").spectrum({
		type:'color',
		color: '#' + Math.floor(Math.random()*16777215).toString(16)
	});
	$('#monsters').val(Math.floor(Math.random()*4)+1)
	$('#spinner').val(Math.floor(Math.random()*1000)+60)
}

function get_controls(){
	let up = options[$('#upkey').val()]
	if (up === 'Arrowup')
		up_code = 38
	else{
		up_code = up.toUpperCase().charCodeAt(0)
	}
	let down = options[$('#downkey').val()]
	if (down === 'Arrowdown')
		down_code = 40
	else{
		down_code = down.toUpperCase().charCodeAt(0)
	}
	let right = options[$('#rightkey').val()]
	if (right === 'Arrowright')
		right_code = 39
	else{
		right_code = right.toUpperCase().charCodeAt(0)
	}
	let left = options[$('#leftkey').val()]
	if (left === 'Arrowleft')
		left_code = 37
	else{
		left_code = left.toUpperCase().charCodeAt(0)
	}
	time_elapsed = $('#spinner').val()
	$('#lblTime').val(time_elapsed)
	ball_numbers = $('#amount').val()
	small_color = $('#ball1').val()
	medium_color = $('#ball2').val()
	big_color = $('#ball3').val()
	monster_number = $('#monsters').val()
}

function allowed_moves(x,y){
	let x_move = [-1,1,0,0]
	let y_move = [0,0,-1,1]
	let possible_moves = []
	for (let i = 0; i < 4; i++){
		if (board[x+x_move[i]][y+y_move[i]] != 0 && board[x+x_move[i]][y+y_move[i]] != 6 && board[x+x_move[i]][y+y_move[i]] != 7 ){
			possible_moves.push([x+x_move[i],y+y_move[i]])
		}
	}
	return possible_moves
}


function shortest_path(moves){
	let min_path = Number.MAX_SAFE_INTEGER
	let move
	for(let i = 0; i < moves.length;i++){
		let dist = Math.abs(moves[i][0] - shape.i) + Math.abs(moves[i][1]-shape.j)
		if (dist < min_path){
			min_path = dist
			move = moves[i]
		}
	}
	return move
}

function locate_pacman(){
	let emptyCell = findRandomEmptyCell(board);
	shape.i = emptyCell[0]
	shape.j = emptyCell[1]
	board[emptyCell[0]][emptyCell[1]]=5
}

function reset_monsters(){
	for(let i = 0; i < monster_number; i++ ){
		board[monsters[i].x][monsters[i].y] = monsters[i].last_c
		monsters[i].x = urls[i][0]
		monsters[i].y = urls[i][1]
		monsters[i].last_c = board[urls[i][0]][urls[i][1]]
		board[urls[i][0]][urls[i][1]] = 6
	}
}