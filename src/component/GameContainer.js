/* @jsx myReact.createElement */
import myReact , { Link } from "../core/myReact.js";
import Game from "./Game.js"
import "../css/Pingpong.css"

const GameContainer = () => {
	// const updateScore = (score) => {
	// 	const scoreElement = document.querySelector('#score p');
	// 	scoreElement.textContent = score;
	// };

	return (
	<div class="game-container">
		<canvas id="myCanvas" >
		</canvas>
		<div id="score">
			<p>0:0</p>
		</div>
		<button id="runButton">Start game</button>
		<button id="" onclick={Game}>Render</button>
	</div>
	)
}

export default GameContainer
