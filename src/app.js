/* @jsx createElement */
import Login from "./component/Login.js";
import MyInfo from "./component/MyInfo.js";
import { createElement,Link } from "./core/myReact.js";
import SignUp from "./component/SignUp.js";
import Game from "./component/Game.js"
import "./css/index.css";

const setAxios = () => {
	axios.defaults.baseURL = "http://localhost:8000/";
	// axios.defaults.baseURL = "http://10.19.247.54:8001/";
	// axios.defauls.timeout = 1000;
}

const App = () => {
	setAxios();

	const updateScore = (score) => {
		const scoreElement = document.querySelector('#score p');
		scoreElement.textContent = score;
	};

	return (
	<div class="app">
		<Link to="/game">
			<button id="linkGame">to game</button>
		</Link>
	</div>
	)
}

export default App;
