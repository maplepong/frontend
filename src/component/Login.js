/* @jsx myReact.createElement */
import myReact , { Link } from "../core/myReact.js";
import { requestLogin } from "../core/Api.js";

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
			router();
		}
		else {
			alert("login fail");
		}
	}
	const url = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-da15e1c7ef76e1c919d318b024eaf492d23793d93fabe249be7b160a5c7a0fa0&redirect_uri=http%3A%2F%2Flocalhost%3A5050%2Fapi-login&response_type=code"

	return (
		<div id="login-container">
			<input id="input-username" placeholder="ID"></input>
			<input id="input-password" placeholder="password"></input>
			<button id="btn-request-login" onClick={() => { requestLogin(getInfo, resultLogin) }}>Login</button>
			<button id="btn-request-login" onClick={() => {
				window.location.replace(url);
			}}>Login 42</button>
			<Link to="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-da15e1c7ef76e1c919d318b024eaf492d23793d93fabe249be7b160a5c7a0fa0&redirect_uri=http%3A%2F%2Flocalhost%3A5050%2Fapi-login&response_type=code">
				<button id="btn-request-login">Login 42</button>
			</Link>
			<p id="p-login-error"></p>
		</div>
	)
}

export default Login;