/* @jsx createElement */
import Login from "./component/Login.js";
import MyInfo from "./component/MyInfo.js";
import SignUp from "./component/SignUp.js";
import { createElement } from "./core/myReact.js";
import "./css/index.css";

const setAxios = () => {
	axios.defaults.baseURL = "http://localhost:8000/";
	// axios.defaults.baseURL = "http://10.19.247.54:8001/";
	// axios.defauls.timeout = 1000;
}
const App = () => {
	setAxios();
	return (
	<div class="app">
		<div data-route = "">
			<img src ="./asset/design/maplepong.png"></img>
		</div>
		<h1>
			Merancendance
		</h1>
		<Login />
		<MyInfo />
		<SignUp />
		<button data-route="home">Home</button>
		<button data-route="login">login</button>
		<button data-route="signup">SignUp</button>
	</div>
	)
}

export default App;