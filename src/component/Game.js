/* @jsx myReact.createElement */
import myReact, { useState, useEffect } from "../core/myReact.js";
import "../css/Pingpong.css";

const PingPong = () => {
    const [score, setScore] = useState({ left: 0, right: 0 });
    const [socket, setSocket] = useState(null);
    const [isGameReady, setIsGameReady] = useState(false); // 게임 준비 상태를 나타내는 상태 추가

    useEffect(() => {
        const newSocket = new WebSocket("ws://10.18.236.7:8000/ws/game/test/");

        newSocket.onopen = function() {
            console.log("서버 연결 완료");
            setSocket(newSocket);
            newSocket.send(JSON.stringify({ type: 'client_connected' })); // 서버에 클라이언트 연결됨을 알림
        };

        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("data : ", data);
            if (data.type === "game_ready") {
        		setIsGameReady(true);
            } else if (data.type === "game_update") {
                setScore(data.data);
            }
        };

        newSocket.onclose = function() {
            console.log("서버 연결 종료");
            setSocket(null);
        };

        return () => {
            if (newSocket) {
                newSocket.close();
            }
        };
    }, []);

    function updateScore(leftAdd, rightAdd) {
        const newScore = {
            left: score.left + leftAdd,
            right: score.right + rightAdd,
        };
        setScore(newScore);
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ data: newScore, type: "game_update" }));
        } else {
            console.error('WebSocket is not open. ReadyState: ' + (socket ? socket.readyState : 'null'));
        }
    }

    let canvas, ctx, ballRadius, x, y, dx, dy;
    let paddleHeight, paddleWidth, paddleX, paddleY, rightPressed, leftPressed, topleftPressed, toprightPressed;
    let ball;
    let interval;

    function initGame() {
        canvas = document.getElementById("myCanvas");
        ctx = canvas.getContext("2d");
        ballRadius = 10;
        x = canvas.width / 2;
        y = canvas.height - 30;
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

        ball = new Image();
        ball.src = "asset/game/mushroom.gif";

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        document.addEventListener("keydown", topkeyDownHandler, false);
        document.addEventListener("keyup", topkeyUpHandler, false);
    }

    useEffect(() => {
		console.log("effect ready : " + isGameReady)
        if (isGameReady) {
            initGame();
            interval = setInterval(draw, 20);
        }
        return () => clearInterval(interval);
    }, [isGameReady]);

    function drawBall() {
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
        ctx.rect(paddleY, paddleHeight - 10, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    function keyDownHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = true;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key === "Right" || e.key === "ArrowRight") {
            rightPressed = false;
        } else if (e.key === "Left" || e.key === "ArrowLeft") {
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
        } else if (e.key === "a") {
            topleftPressed = false;
        }
    }

    function draw() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        drawEnemyPaddle();

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            } else {
                clearInterval(interval);
                updateScore(1, 0);
                return;
            }
        }
        if (y + dy < ballRadius) {
            if (x > paddleY && x < paddleY + paddleWidth) {
                dy = -dy;
            } else {
                clearInterval(interval);
                updateScore(0, 1);
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
        if (socket && socket.readyState === WebSocket.OPEN) {
            const data = {
                ball: { x: x, y: y },
                paddle: { x: paddleX, y: paddleY },
            };
            socket.send(JSON.stringify({ "data": data, "type": "game_update" }));
        }
    }

    var resultValue = score.left + " : " + score.right;
    if (score.left > 2 || score.right > 2) {
        resultValue = (score.left > score.right ? "left win by " : "right win by ") + resultValue;
    }

    return (
        <div className="game-container">
            <canvas id="myCanvas" width="240" height="160"></canvas>
            <div id="score">
                <p>{resultValue}</p>
            </div>
        </div>
    );
}

export default PingPong;
