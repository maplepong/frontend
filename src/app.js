import Component from "./core/Component.js";
import router from "../src/core/Router.js";


const setAxios = () => {
	axios.defaults.baseURL = "http://localhost:8000/";
	// axios.defaults.baseURL = "http://10.19.247.54:8001/";
	// axios.defauls.timeout = 1000;
}

export const App = () => {
	// this.state = {};
    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("routeChange", router);
      window.addEventListener("popstate", router);

      // 초기 페이지 로드 시 라우터 호출
      router();
    });
	setAxios();

	// .addEvent("click", "[data-route]", ({ target }) => {
	// 	const route = target.dataset.route;
	// 	if (route) {
	// 	  const newPath = "/" + route;
	// 	  history.pushState({}, "", newPath);
	// 	  router();
	// 	} 

	return `
		<div data-route="">
      <img src="./src/asset/design/maplepong.png" id="Logo">
    </div>
    <header>
			<button data-route="home">Home</button>
			<button data-route="about">About</button>
			<button data-route="contact">Contact</button>
			<button data-route="login" id="LgnContainer">Login</button>
			<button data-route="main">after login</button>
		</header>
		<main></main>
    `;
}
