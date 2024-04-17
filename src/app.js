/* @jsx myReact.createElement */
// import Login from "./component/Login.js";
// import MyInfo from "./component/MyInfo.js";
import axios from "axios";
import myReact, { Link } from "./core/myReact.js";
import myReactDOM from "./core/myReactDOM.js";
import { requestLogin, requestFriendList, requestUserInfo } from "./core/Api.js";
import FriendList from "./component/FriendList.js"
import RequestFriend from "./component/RequestFriend.js";
import { useState, useEffect } from "./core/myReact.js"
import SignUp from "./component/SignUp.js";
import "./css/index.css";
import "./css/friend.css";
import Test from "./component/Test.js"
import api from "./core/Api_.js";

const setAxios = () => {
	axios.defaults.baseURL = "http://localhost:12649/";
	// axios.defaults.baseURL = "http://10.19.247.54:8001/";
	axios.defaults.timeout = 3000;
}

const App = () => {
	// setAxios(); // 필요 없다고 함

	function checkLogin() {
		if (localStorage.accessToken) {
			const login = document.querySelector("#btn-nav-login");
			// const logout = document.querySelector("#btn-nav-logout");
			if (login)
				login.style.display = 'none';
		}
	}

	document.addEventListener("DOMContentLoaded", () => checkLogin());

	return <div class="app">
            <Link to="" >
                <img style={"width:500px"} src="./asset/design/maplepong.png"></img>
            </Link>
			<Link to="login"><button id="btn-nav-login">로그인</button></Link>
			<button id="btn-nav-logout" onclick={() => {api.logout()}}>로그아웃</button>

			{/* <Test /> */}
            {/* <FriendList /> */}
			{/* <RequestFriend /> */}
			{/* <SignUp /> */}
			
			<Link to="home" id="home"><button>Home</button></Link>
			<Link to="test" id="home"><button>Test</button></Link>
			<Link to="api-test" id="home"><button>APITest</button></Link>
		</div>
}

export default App;