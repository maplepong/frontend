/* @jsx myReact.createElement */
import myReact , { Link } from "../core/myReact.js";
import { requestLogin, requestLogout } from "../core/Api.js";
import api from "../core/Api_.js";
import router from "../core/Router.js";
import "../css/login.css";

const Login = () => {
	async function login () {
		const username = document.querySelector("#input-username").value;
		const password = document.querySelector("#input-password").value;
		const getInfo = () => {
			return ([username, password]);
		}
		console.log("끼얏 호우!!!!");
		const response = await api.login(getInfo)
		if (response.status != 200) {
			console.log(response)
			return response;
		}
		else {
			console.log(response);
			myReact.redirect("home")
		}
	}

	return (
		<div id="login-container">
			<div id="login-box">
				<input id="input-username" placeholder="ID"></input>
				<input id="input-password" placeholder="password"></input>
				<button onclick={login} id="login-btn">로그인</button>
				<p id="p-login-error"></p>
			</div>
		</div>
	)
}

export default Login;