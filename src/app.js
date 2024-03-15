/* @jsx createElement */
import R from "./core/myReact.js";
import router from "../src/core/Router.js";

const {createElement, render, useState, addEvent} = R();

const App = () => {
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
console.log(<App />)

render(<App />)
const app = (document.querySelector("#app"));
addEvent(app, "click", "[data-route]", ({ target }) => {
		const route = target.dataset.route;
		if (route) {
		  const newPath = "/" + route;
		  history.pushState({}, "", newPath);
		  router();
		}} )