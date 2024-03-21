/* @jsx createElement */
import Login from "./component/Login.js";
import MyInfo from "./component/MyInfo.js";
import { createElement,Link } from "./core/myReact.js";
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
		<Link to= "">
			<img src ="./asset/design/maplepong.png"></img>
		</Link>
		<h1>
			Merancendance
		</h1>
		<Login />
		{/* checking code below this line*/}
		{/* <MyInfo /> */}
	</div>
	)
}

export default App;