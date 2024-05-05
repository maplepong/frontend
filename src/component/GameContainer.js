/* @jsx myReact.createElement */
import myReact , { Link, useState } from "../core/myReact.js";
import Game from "./Game.js"
import "../css/Pingpong.css"

const GameContainer = () => {
const [score, setScore] = useState("0:0");

	// const updateScore = (score) => {
	// 	const scoreElement = document.querySelector('#score p');
	// 	if (scoreElement) {
	// 	scoreElement.textContent = score;
	// 	} else {
	// 		console.error("Score element not found.");
	// 	}
	// };

	return (
	<div class="game-container">
		<canvas id="myCanvas" >
		</canvas>
		<div id="score">
			<p>{score}</p>
		</div>
		<button id="runButton">Start game</button>
		<button id="" onclick={Game}>Render</button>
	</div>
	)
}

export default GameContainer
