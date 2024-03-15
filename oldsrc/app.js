/* @jsx createElement */
import R from "./core/myReact.js";
import router from "../src/core/Router.js";

const {createElement, render, useState, addEvent} = R();

const setAxios = () => {
	axios.defaults.baseURL = "http://localhost:8000/";
	// axios.defaults.baseURL = "http://10.19.247.54:8001/";
	// axios.defauls.timeout = 1000;
}

const App = () => {
    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("routeChange", router);
      window.addEventListener("popstate", router);

      // 초기 페이지 로드 시 라우터 호출
      router();
    });
	setAxios();

	return 
	<>
	<div data-route="">
      <img src="./src/asset/design/maplepong.png" id="Logo" />
    </div>
    <header>
			<button data-route="home">Home</button>
			<button data-route="about">About</button>
			<button data-route="contact">Contact</button>
			<button data-route="login" id="LgnContainer">Login</button>
			<button data-route="main">after login</button>
	</header>
	<main></main>
	</>
}

render(<App />)
const app = (document.querySelector("#app"));
addEvent(app, "click", "[data-route]", ({ target }) => {
		const route = target.dataset.route;
		if (route) {
		  const newPath = "/" + route;
		  history.pushState({}, "", newPath);
		  router();
		}} )