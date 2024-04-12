/* @jsx myReact.createElement */
// import Login from "./component/Login.js";
// import MyInfo from "./component/MyInfo.js";
import myReact, { Link } from "./core/myReact.js";
import myReactDOM from "./core/myReactDOM.js";
import { requestLogin, requestFriendList, requestUserInfo } from "./core/Api.js";
import FriendList from "./component/FriendList.js"
import { useState, useEffect } from "./core/myReact.js"
// import SignUp from "./component/SignUp.js";
import "./css/index.css";
import Test from "./component/Test.js"

const setAxios = () => {
	axios.defaults.baseURL = "http://localhost:8000/";
	// axios.defaults.baseURL = "http://10.19.247.54:8001/";
	axios.defaults.timeout = 1000;
}

const App = () => {
	setAxios();
	return <div class="app">
            <Link to="" >
                <img style={"width:200px"}src="./asset/design/maplepong.png"></img>
            </Link>
            <FriendList />
			<Link to="home" id="home"><button>Home</button></Link>
			<Link to="test" id="home"><button>Test</button></Link>
            
	    </div>
}

export default App;
