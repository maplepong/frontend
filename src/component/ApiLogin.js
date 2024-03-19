/* @jsx createElement */
import { request42ApiLogin, requestUserInfo } from "../core/Api.js";
import router from "../core/Router.js";
import {createElement, Link } from "../core/myReact.js";
import "../css/MyInfo.css"

const API= () => {
	const response = request42ApiLogin();

	return (
		<div id="container-myinfo" class="modal">
			<div id="myinfo-headline">
				<p>redirection page</p>
			</div>
		</div>
	)
}

export default MyInfo;