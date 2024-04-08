/* @jsx myReact.createElement */
import myReact , { Link, useEffect } from "../core/myReact.js";
import { request42ApiLogin, requestUserInfo } from "../core/Api.js";

const ApiLogin = () => {
	const api_link = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-da15e1c7ef76e1c919d318b024eaf492d23793d93fabe249be7b160a5c7a0fa0&redirect_uri=http%3A%2F%2Flocalhost%3A5050%2Fapi-login&response_type=code";
	
	const redirect = () => {
		window.location.href = api_link;
	}
	//useEffect(redirect, []);

	const getCode = () => {
		const url = window.location.pathname;
		const code = url.split("code=")[1];
		console.log("get code()")
		console.log("url:", url);
		return code;
	}
	const code = getCode();
	if (code) {
		console.log("code:", code);
		request42ApiLogin(code)
			.then(response => {
				console.log("로그인 성공:", response);
				requestUserInfo()
					.then(userInfo => {
						console.log("사용자 정보:", userInfo);
						router.navigate("/user-info");
					})
					.catch(error => {
						console.error("사용자 정보 요청 중 오류 발생:", error);
					});
			})
			.catch(error => {
				console.error("로그인 요청 중 오류 발생:", error);
			});
	}
	else
		console.log("code is null");
	return (
		<div id="api-login-container">
			<p>42 login</p>
			<button onclick={redirect}>버튼입니둥</button>
		</div>
	)
}

export default ApiLogin;