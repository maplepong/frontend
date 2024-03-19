/* @jsx createElement */
import {createElement, Link } from "../core/myReact.js";
import {requestLogin} from "../core/Api.js"
import router from "../core/Router.js";

const Login = () => {
	const getInfo = () => {
		const username = document.querySelector("#input-username").value;
		const password = document.querySelector("#input-password").value;
		console.log("f");
		return ([username, password]);
	};

	const resultLogin = (status) => {
		if (status === 200)
		{
			//useNavigate로 뺄 예정
			history.pushState({}, "", "/home");
			router();
		}
		else 
		{
			alert("login fail");
		}
	}

	return (
		<div id="login-container">
			<input id="input-username" placeholder="ID"></input>
			<input id="input-password" placeholder="password"></input>
			<button id="btn-request-login" onClick={() => {requestLogin(getInfo, resultLogin)}}>Login</button>
			<p id="p-login-error"></p>
		</div>
	)
}

export default Login;