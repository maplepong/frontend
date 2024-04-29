/* @jsx myReact.createElement */
import myReact , { Link, useState, useEffect} from "../core/myReact.js";
import "../css/Pingpong.css"

const PingPong = () => {
	const [score, setScore] = useState({left:0, right:0});

	console.log(score);
	
	function updateScore (leftAdd, rightAdd) {
		flag: 1; //updating
		console.log(score);
		setScore({left : score.left += leftAdd,
				right : score.right += rightAdd});
	}
		
	var canvas, ctx, ballRadius, x, y, dx, dy;
	var paddleHeight, paddleWidth, paddleX, paddleY, rightPressed,leftPressed, topleftPressed, toprightPressed;
	// var leftscore, rightscore;
	var imagepath, flag;
	var interval;
	var ball;



	function initGame () {
		canvas = document.getElementById("myCanvas");
		ctx = canvas.getContext("2d");
		ballRadius = 10;
		x = canvas.width/2;
		y = canvas.height-30;
		dx = 2;
		dy = -2;

		paddleHeight = 10;
		paddleWidth = 75;
		paddleX = (canvas.width - paddleWidth) / 2;
		paddleY = (canvas.width - paddleWidth) / 2;
		rightPressed = false;
		leftPressed = false;
		toprightPressed = false;
		topleftPressed = false;
		// leftscore = 0;
		// rightscore = 0;

		imagepath = "asset/game/mushroom.gif";
		ball = new Image();
		ball.src = imagepath;

		flag = 0;
		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		document.addEventListener("keydown", topkeyDownHandler, false);
		document.addEventListener("keyup", topkeyUpHandler, false);
	}
	// var interval; // = setInterval(draw, 20);
	// var intervalGame; // = setInterval(runGame, 3000);

	const gameDraw = () => {
		interval = setInterval(draw, 20);

		return () => {
			console.log("score", score);
			clearInterval(interval);
		};
	}
	

	// function runGame() {
	// 	if (flag){
	// 		if (leftscore > 2  || rightscore > 2) {
	// 			console.log("gameover");
	// 			clearInterval(intervalGame);
	// 			return;
	// 		}
	// 		else {
	// 			setTimeout(3000);
	// 			x = canvas.width/2;
	// 			y = canvas.height/2;
	// 			flag = 0;
	// 			interval = setInterval(draw, 20);
	// 		}Z
	// 	}
	// }



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
		} 
		else if (e.key === "Left" || e.key === "ArrowLeft") {
			leftPressed = true;
		}
	}

	function keyUpHandler(e) {
		if (e.key === "Right" || e.key === "ArrowRight") {
			rightPressed = false;
		}	
		else if (e.key === "Left" || e.key === "ArrowLeft") {
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
	}	
		else if (e.key === "a") {
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
			if (x > paddleX && x < paddleX + paddleWidth || x > paddleY && 
				x < paddleY + paddleWidth) {
				dy = -dy;
			}
		else if (y + dy > canvas.height){ //위아래 벽면에 닿은 경우
			console.log("score", score);
			clearInterval(interval);
			return updateScore(1, 0);
		}
		else if (y + dy < ballRadius){
			console.log("score", score);
			clearInterval(interval);
			return updateScore(0, 1);
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
	
	var resultValue = score.left + " : " + score.right;
	if (!flag) {
		useEffect(initGame);
		console.log("스코어:",score.left, score.right)
		
		if (score.left < 3 && score.right < 3){
			useEffect(gameDraw, score);
		}
		else {
			resultValue = "Game finished\n" + (score.left > score.right ?
							 "left win by " : "right win by ") + resultValue ;
		}
	}


	return (
	<div class="game-container">
		<canvas id="myCanvas" width="600" height="360">
		</canvas>
		<div id="score">
			<p>{resultValue}</p>
		</div>
	</div>
	)
}

export default PingPong
