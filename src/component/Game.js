/* @jsx myReact.createElement */
import myReact , { Link, useState, useEffect} from "../core/myReact.js";
import "../css/Pingpong.css"

const PingPong = () => {
	const [score, setScore] = useState({left:0, right:0});
	const [socket, setSocket] = useState(null);
	const newSocket = new WebSocket("ws://192.168.45.188:8000/ws/game/");

	useEffect(() =>  {
		WebSocket.onopen = function() {
			console.log("서버 연결 완료");
		}
		setSocket(newSocket);

		newSocket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log("data : ", data);
			setScore(data);
		};

		return () => newSocket.close();
	}, []);
	
	function updateScore (leftAdd, rightAdd) {
		const data = {
			left: score.left + leftAdd,
			right: score.right + rightAdd,
		};
		setScore(data);
		socket.send(JSON.stringify({"data": data, "type": "game_update"}));
	}
		
	var canvas, ctx, ballRadius, x, y, dx, dy;
	var paddleHeight, paddleWidth, paddleX, paddleY, rightPressed,leftPressed, topleftPressed, toprightPressed;
	var imagepath, flag;
	var interval;
	var ball;

	function initGame () {
		//canvas init이랑 각 game 시작 시 초기화해주는 부분 분리
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

		imagepath = "asset/game/mushroom.gif";
		ball = new Image();
		ball.src = imagepath;

		document.addEventListener("keydown", keyDownHandler, false);
		document.addEventListener("keyup", keyUpHandler, false);
		document.addEventListener("keydown", topkeyDownHandler, false);
		document.addEventListener("keyup", topkeyUpHandler, false);
	}

	const gameDraw = () => {
		if (score.left < 3 && score.right < 3){
			interval = setInterval(draw, 20);
		}

		return () => {
			console.log("score", score);
			clearInterval(interval);
		};
	}

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
		if (!ctx)
			return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawBall();
		drawPaddle();
		drawEnemyPaddle();

		if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {//양옆의 벽에 닿은 경우
			dx = -dx;
		}
		if (y + dy > canvas.height - ballRadius) {//아래벽
			if (x > paddleX && x < paddleX + paddleWidth)  {//패들에 닿은 경우
				dy = -dy;
			}
			else {//그외 : 사망
				console.log("score", score);
				clearInterval(interval);
				return updateScore(1, 0);
			}
		}
		if (y + dy < ballRadius) {//윗벽
			if (x > paddleY && x < paddleY + paddleWidth) {//패들에 닿은 경우
				dy = -dy;
			}
			else {//그외: 사망
				console.log("score", score);
				clearInterval(interval);
				return updateScore(0, 1);
			}
		}
		//

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
	
	useEffect(initGame, score);
	useEffect(gameDraw, score);
	var resultValue = score.left + " : " + score.right;
	if (score.left > 2 	|| score.right > 2){
		resultValue = (score.left > score.right ?
						"left win by " : "right win by ") + resultValue ;
	}


	return (
	<div class="game-container">
		<canvas id="myCanvas" width="240" height="160">
		</canvas>
		<div id="score">
			<p>{resultValue}</p>
		</div>
	</div>
	)
}

export default PingPong
