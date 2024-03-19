/* @jsx createElement */
import { requestUserInfo } from "../core/Api.js";
import router from "../core/Router.js";
import {createElement, Link } from "../core/myReact.js";
import "../css/MyInfo.css"

const MyInfo = () => {
	requestUserInfo(localStorage.nickname);
	// const resultGetInfo(status) => {
	// 	if ((status) == 401){ //token Expire
	// 		history.pushState({}, "", "/");
	// 		router();
	// 	}
	// }
	return (
		<div id="container-myinfo" class="modal">
			<div id="myinfo-headline">
				<p>내정보</p>
				<button>X</button>
			</div>
			<div id="myinfo-body">
				<img id="myinfo-img" src=""></img>
				<div></div>
			</div>
		</div>
	)
}

export default MyInfo;