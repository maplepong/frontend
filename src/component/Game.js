/* @jsx myReact.createElement */
import myReact, { useState, useEffect } from "../core/myReact.js";
import GameRoom from "./GameRoom.js";
import "../css/Pingpong.css";

const PingPong = ({gameinfo}) => {
    let ctx, ball, ballRadius, x, y, dx, dy;
    let paddleHeight, paddleWidth, paddleX, paddleY, rightPressed, leftPressed, topleftPressed, toprightPressed;
    let interval;

    const [score, setScore] = useState({ left: 0, right: 0 });
    const [canvas, setCanvas] = useState(null);

    if (!gameinfo || !socket) {
        console.log("something is wrong...");
        return null;
    }

    useEffect(() => {
        const newCanvas = document.getElementById("myCanvas");
        if (newCanvas && newCanvas.getContext) {
            ctx = newCanvas.getContext("2d");
            setCanvas(newCanvas);
        }
    }, []);

    useEffect(() => {
        if (canvas) {
            console.log("Starting game loop");
            initGame(canvas);
            interval = setInterval(draw, 20);
            return () => clearInterval(interval);
        }
    }, [canvas]);

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

    function initGame(newCanvas) {
        ballRadius = 10;
        x = newCanvas.width / 2;
        y = newCanvas.height - 30;
        dx = 2;
        dy = -2;

        paddleHeight = 10;
        paddleWidth = 75;
        paddleX = (newCanvas.width - paddleWidth) / 2;
        paddleY = (newCanvas.width - paddleWidth) / 2;
        rightPressed = false;
        leftPressed = false;
        toprightPressed = false;
        topleftPressed = false;

        ball = new Image();

        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        document.addEventListener("keydown", topkeyDownHandler, false);
        document.addEventListener("keyup", topkeyUpHandler, false);
    }

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
