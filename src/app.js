/* @jsx createElement */
import {createElement, render, useState, addEvent} from "./core/myReact.js";
import router from "../src/core/Router.js";
import "./css/index.css"

const setAxios = () => {
	axios.defaults.baseURL = "http://localhost:8000/";
	// axios.defaults.baseURL = "http://10.19.247.54:8001/";
	// axios.defauls.timeout = 1000;
}
const App = () => {
	  setAxios();
	return (
	<div>
		<div data-route = "">
			<img src ="./asset/design/maplepong.png"></img>
		</div>
		<h1>
			Merancendance
		</h1>
		<div> main 위치</div>
		<main></main>
		<button data-route="home">Home</button>
	</div>
	)
}

export default App;