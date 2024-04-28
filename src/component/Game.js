/* @jsx myReact.createElement */
import myReact, { useEffect } from "../core/myReact.js";
import "../css/Pingpong.css"

const Game = (isEnd) => {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	var ballRadius = 10;
	var x = canvas.width/2;
	var y = canvas.height-30;
	var dx = 2;
	var dy = -2;

	var paddleHeight = 10;
	var paddleWidth = 75;
	var paddleX = (canvas.width - paddleWidth) / 2;
	var paddleY = (canvas.width - paddleWidth) / 2;
	var rightPressed = false;
	var leftPressed = false;
	var toprightPressed = false;
	var topleftPressed = false;
	var leftscore = 0;
	var rightscore = 0;
	var flag = 0;
	var interval; // = setInterval(draw, 20);
	var intervalGame; // = setInterval(runGame, 3000);

	useEffect(() => {
		interval = setInterval(draw, 20);
		intervalGame = setInterval(runGame, 3000);

		return () => {
			clearInterval(interval);
			clearInterval(intervalGame);
		};
	}, [leftscore, rightscore]);

	function runGame() {
		if (flag){
			if (leftscore > 2  || rightscore > 2) {
				console.log("gameover");
				clearInterval(intervalGame);
				return;
			}
			else {
				setTimeout(3000);
				x = canvas.width/2;
				y = canvas.height/2;
				flag = 0;
				interval = setInterval(draw, 20);
			}
		}
	}

	var imagepath = "asset/game/mushroom.gif";
	var ball = new Image();
	ball.src = imagepath;



	function drawBall() {
		// ctx.beginPath();
		// ctx.arc(x, y, ballRadius, 0, Math.PI*2);
		// ctx.fillStyle = "#0095DD";
		// ctx.fill();
		// ctx.closePath();
		ctx.drawImage(ball, x - ballRadius, y - ballRadius, ballRadius * 2, ballRadius * 2);
	}

	function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
	}

	function drawEnemyPaddle() {
		ctx.beginPath();
	ctx.rect(paddleY, paddleHeight -10, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
	}

	function keyDownHandler(e) {
		if (e.key === "Right" || e.key === "ArrowRight") {
			rightPressed = true;
		} else if (e.key === "Left" || e.key === "ArrowLeft") {
	leftPressed = "true";
	}
	}

	function keyUpHandler(e) {
		if (e.key === "Right" || e.key === "ArrowRight") {
		rightPressed = false;
	}	else if (e.key === "Left" || e.key === "ArrowLeft") {
		leftPressed = false;
	}
	}

	function topkeyDownHandler(e) {
		if (e.key === "d") {
			toprightPressed = true;
		} else if (e.key === "a") {
	topleftPressed = true;
	}
	}

	function topkeyUpHandler(e) {
		if (e.key === "d") {
		toprightPressed = false;
	}	else if (e.key === "a") {
		topleftPressed = false;
	}
	}

	function draw() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBall();
		// ball.onload  = function() {
		// 	drawBall();
		// }

		drawPaddle();
		drawEnemyPaddle();

		if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
			dx = -dx;
		}//양옆의 벽면에 닿은 경우
		if (y + dy > canvas.height - ballRadius || y + dy < 10) {
			if (x > paddleX && x < paddleX + paddleWidth || x > paddleY && x < paddleY + paddleWidth) 		{
				dy = -dy;
			}
		else if (y + dy > canvas.height){ //위아래 벽면에 닿은 경우
			console.log(leftscore += 1);
			clearInterval(interval);
			flag = 1;
			const score = '${leftscore}:${rightscore}';
			console.log(score);
			updateScore(score);
			return;
		}
		else if (y + dy < ballRadius){
			console.log(rightscore += 1);
			clearInterval(interval);
			flag = 1;
			const score = '{$leftscore}:${rightscore}';
			updateScore(score);
			return;
		}
		}
		if (rightPressed) {
			paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
		} else if (leftPressed) {
			paddleX = Math.max(paddleX - 7, 0);
		}

		if (toprightPressed) {
			paddleY = Math.min(paddleY + 7, canvas.width - paddleWidth);
		} else if (topleftPressed) {
			paddleY = Math.max(paddleY - 7, 0);
		}

		x += dx;
		y += dy;
	}

	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	document.addEventListener("keydown", topkeyDownHandler, false);
	document.addEventListener("keyup", topkeyUpHandler, false);
}


export default Game
