/* @jsx createElement */
import {createElement, Link } from "../core/myReact.js";

const MyInfo = () => {
	return (
		<div id="container-myinfo" class="modal">
			<div id="myinfo-headline">
				<p>내정보</p>
				<button>X</button>
			</div>
			<div id="myinfo-body">
				<img id="myinfo-img" src></img>
				<div></div>
			</div>
		</div>
	)
}

export default MyInfo;