/* @jsx createElement */
import { requestUserInfo } from "../core/Api.js";
import router from "../core/Router.js";
import {createElement, Link } from "../core/myReact.js";
import "../css/MyInfo.css"

const MyInfo = () => {
	// requestUserInfo(localStorage.nickname, resultInfo);

	return (
		<div id="container-myinfo" class="modal">
			<div id="myinfo-headline">
				<p></p>
				<button>X</button>
			</div>
			<div id="myinfo-body">
				<img id="myinfo-img"></img>
				<div></div>
			</div>
		</div>
	)
}

export default MyInfo;