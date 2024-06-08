/* @jsx myReact.createElement */
import myReact, { useState, useEffect } from "../core/myReact.js";
import "../css/Pingpong.css";

const PingPong = ({ gameinfo, gameSocket }) => {
    let ctx, ballRadius, x, y, dx, dy, canvas;
    let paddleHeight, paddleWidth, paddleX, rightPressed, leftPressed, enemyPaddleX;
    let interval;
    let isowner = false;

    const [score, setScore] = useState({ left: 0, right: 0 });


    useEffect(() => {
        if (!gameinfo || !gameSocket) {
            console.log("something is wrong...");
            return;
        }

        if (gameinfo.owner == localStorage.getItem("nickname")) isowner = true;

        console.log("PingPong useEffect");
        console.log("gameInfo:", gameinfo);
        console.log("gameSocket:", gameSocket.readyState);
        console.log("is owner ? : ", isowner);

        canvas = document.getElementById("myCanvas");

        if (canvas && canvas.getContext) {
            ctx = canvas.getContext("2d");
            initGame(canvas);//게임 초기화
            draw();//드로우 함수 호출
            // interval = setInterval(draw, 20);//드로우 함수 초당 20번 호출
            //여기서 인터벌을 무한으로 갈겼을 가능성이 높음 - 다른데로 옮기거나 셋인터벌함수를 안쓰던가
            gameSocket.onmessage = (event) => {
                const message = JSON.parse(event.data);
                handleSocketMessage(message);//움직임 전송?
            };
 
            return () => {//컴포넌트 해제시
                document.removeEventListener("keydown", keyDownHandler);
                document.removeEventListener("keyup", keyUpHandler);
            };
        } else {
            console.log("Canvas context not supported");
        }
    }, []);


    function handleSocketMessage(message) {
        if (message.type === "paddle_move") {
            const { data } = message;
            enemyPaddleX = data.x;
            console.log("data : ", data)
        } else if (message.type === "game_update") {
            const { ball, paddle } = message.data;
            if (ball && isowner != true) {
                x = ball.x;
                y = ball.y;
                dx = ball.dx;
                dy = ball.dy;
            }
            if (paddle) {
                enemyPaddleX = paddle.x;
            }
        }
    }

    function updateScore(leftAdd, rightAdd) {//스코어 업데이트
        const newScore = {
            left: score.left + leftAdd,
            right: score.right + rightAdd,
        };
        //setScore(newScore);
        if (score.left < 3 && score.right < 3) resetGame();//3점 일하라면 게임 재시작
    }

    function initGame(newCanvas) {//게임 초기화화
        console.log("initGame");
        ballRadius = 10;
        x = newCanvas.width / 2;
        y = newCanvas.height / 2;
        dx = 2;
        dy = 2;

        paddleHeight = 10;
        paddleWidth = 75;
        paddleX = (newCanvas.width - paddleWidth) / 2;
        enemyPaddleX = (newCanvas.width - paddleWidth) / 2;
        rightPressed = false;
        leftPressed = false;

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
    }


    function resetGame() {
        x = canvas.width / 2;
        y = canvas.height / 2;
        dx = 2;
        dy = 2;
        paddleX = (canvas.width - paddleWidth) / 2;
        enemyPaddleX = (canvas.width - paddleWidth) / 2;
        draw();    
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
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
        ctx.rect(enemyPaddleX, 0, paddleWidth, paddleHeight);
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

    function draw() {
        if (!ctx) return;
        if (score && (score.left >= 3 || score.right >= 3)) return;
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
                updateScore(1, 0);
                return;
            }
        }
        if (y + dy < ballRadius) {
            if (x > enemyPaddleX && x < enemyPaddleX + paddleWidth) {
                dy = -dy;
            } else {
                updateScore(0, 1);
                return;
            }
        }

        if (rightPressed) {
            paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
            sendPaddlePosition();
        } else if (leftPressed) {
            paddleX = Math.max(paddleX - 7, 0);
            sendPaddlePosition();
        }

        x += dx;
        y += dy;
        sendGameState();
        interval = requestAnimationFrame(draw);
    }

    function sendPaddlePosition() {
        if (gameSocket && gameSocket.readyState === WebSocket.OPEN) {
            gameSocket.send(JSON.stringify({
                type: "paddle_move",
                data: { x: canvas.width - paddleX },
                nickname: localStorage.getItem("nickname"),
            }));
        }
    }

    function sendGameState() {
        if (gameSocket && gameSocket.readyState === WebSocket.OPEN) {
            const data = {
                ball: { x: canvas.width - x, y: canvas.height - y, dx: -dx, dy: -dy },
                paddle: { x: canvas.width - paddleX }
            };
            gameSocket.send(JSON.stringify({ data: data, type: "game_update", nickname: localStorage.getItem("nickname") }));
        }
    }

    var resultValue = score.left + " : " + score.right;
    if (score.left > 2 || score.right > 2) {
        resultValue = (score.left > score.right ? "left win by " : "right win by ") + resultValue;
    }


    return (
        <div id="score">
            <p>{resultValue}</p>
            <canvas id="myCanvas" width="480" height="320"></canvas>
        </div>
    );
}

export default PingPong;
