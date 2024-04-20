/* @jsx myReact.createElement */
import myReact , { Link, useEffect, useState } from "../core/myReact.js";
import Game from "./Game.js"
import "../css/Pingpong.css"

const GameContainer = () => {
	// const updateScore = (score) => {
	// 	const scoreElement = document.querySelector('#score p');
	// 	scoreElement.textContent = score;
	// };

	const [score, setScore] = useState("0:0");

	const updateScore = (newscore) => {
		console.log({newscore})
		console.log("score: " , {score})
		setScore(newscore);
	}
	
	return (
	<div class="game-container">
		<canvas id="myCanvas" >
		</canvas>
		<div id="score">
			<p>{ score }</p>
		</div>
		<button id="runButton">Start game</button>
		<button id="" onclick={() => Game({ updateScore })}>Render</button>
	</div>
	)
}
  
  export default GameContainer;

