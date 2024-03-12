import Component from "./core/Component.js";
import router from "../src/core/Router.js";


const setAxios = () => {
	axios.defaults.baseURL = "http://localhost:8001/";
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



// export default class App extends Component {
//   setup() {
//     this.state = {};
//     document.addEventListener("DOMContentLoaded", () => {
//       window.addEventListener("routeChange", router);
//       window.addEventListener("popstate", router);

//       // 초기 페이지 로드 시 라우터 호출
//       router();
//     });
//   }

//   template() {
//     return `
// 		<div data-route="">
//       <img src="./src/asset/design/maplepong.png" id="Logo">
//     </div>
//     <header>
// 			<button data-route="home">Home</button>
// 			<button data-route="about">About</button>
// 			<button data-route="contact">Contact</button>
// 			<button data-route="login" id="LgnContainer">Login</button>
// 			<button data-route="main">after login</button>
// 		</header>
// 		<main></main>
//     `;
//   }

//   mounted() {
// 	setAxios();
//   }

//   setEvent() {
//     this.addEvent("click", "[data-route]", ({ target }) => {
//       const route = target.dataset.route;
//       if (route) {
//         const newPath = "/" + route;
//         history.pushState({}, "", newPath);
//         router();
//       } 
// 	//   else {
//     //     console.log("Invalid or empty data-route attribute");
//     //     history.pushState({}, "", "/");
//     //     router(); // 변경된 URL에 따라 컴포넌트 렌더링
//     //   }
//     });
//   }
// }
