/* @jsx createElement */
import { request42ApiLogin, requestUserInfo } from "../core/Api.js";
import router from "../core/Router.js";
import { createElement, Link } from "../core/myReact.js";
import "../css/MyInfo.css"

const ApiLogin = () => {
	const getCode = () => {
		const url = window.location.pathname;
		const code = url.split("code=")[1];
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
		</div>
	)
}

export default ApiLogin;