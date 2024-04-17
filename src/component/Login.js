/* @jsx myReact.createElement */
import myReact , { Link } from "../core/myReact.js";
import { requestLogin, requestLogout } from "../core/Api.js";
import api from "../core/Api_.js";
import router from "../core/Router.js";

const Login = () => {
	async function login () {
		const username = document.querySelector("#input-username").value;
		const password = document.querySelector("#input-password").value;
		const getInfo = () => {
			return ([username, password]);
		}
		console.log("끼얏 호우!!!!");
		const response = await api.login(getInfo)
		if (response.status != 200) return error;
		else {
			console.log(response);
			router("/home")
		}
	}

	return (
		<div id="login-container">
			<input id="input-username" placeholder="ID"></input>
			<input id="input-password" placeholder="password"></input>
			<button onclick={login}>로그인</button>
			<button onclick={() => {api.logout()}}>로그아웃</button>
			<p id="p-login-error"></p>
		</div>
	)
}

export default Login;