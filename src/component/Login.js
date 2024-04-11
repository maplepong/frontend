/* @jsx myReact.createElement */
import myReact , { Link } from "../core/myReact.js";
import { requestLogin, requestLogout } from "../core/Api.js";

const Login = () => {
	const getInfo = () => {
		const username = document.querySelector("#input-username").value;
		const password = document.querySelector("#input-password").value;
		return ([username, password]);
	};

	const resultLogin = (status) => {
		if (status === 200) {
			//useNavigate로 뺄 예정
			history.pushState({}, "", "/home");
			myReact.render("home");
		}
		else {
			alert("login fail");
		}
	}

	const resultLogout = (status) => {
		if (status === 200) {
			alert("logout success");
			history.pushState({}, "", "/");
			myReact.render("/");
		}
		else {
			alert("logout fail");
		}
	}

	return (
		<div id="login-container">
			<input id="input-username" placeholder="ID"></input>
			<input id="input-password" placeholder="password"></input>
			<button id="btn-request-login" onClick={() => { requestLogin(getInfo, resultLogin) }}>Login</button>
			<button id="btn-request-logout" onClick={() => { requestLogout(resultLogout)}}>Logout</button>
			<p id="p-login-error"></p>
		</div>
	)
}

export default Login;