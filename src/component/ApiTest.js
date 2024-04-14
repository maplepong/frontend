/* @jsx myReact.createElement */
import myReact, { useState, useEffect } from "../core/myReact.js";
import api from "../core/Api_.js"

const ApiTest = () => {
	async function requestLogin() {
		const res = await api.login(() => {return ["test", "4545"]})
		console.log(res);
	}
	async function befriend() {
		console.log(await api.sendFriendRequest("subini"));
	}


	return (<div>
		<button onclick={requestLogin}>login</button>
		<button onclick={befriend}>친구요청</button>
	</div>)
	
}

export default ApiTest;