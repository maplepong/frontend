import Component from "./core/Component.js";
import router from "../src/core/Router.js";

export default class app extends Component {
  setup() {
    this.state = {};
    document.addEventListener("DOMContentLoaded", () => {
      window.addEventListener("routeChange", router);
      window.addEventListener("popstate", router);

      // 초기 페이지 로드 시 라우터 호출
      router();
    });
  }

  template() {
    return `
		<h1 data-route="">Simple Spa</h1>
		<header>
			<button data-route="home">Home</button>
			<button data-route="about">About</button>
			<button data-route="contact">Contact</button>
			<button data-route="login">Login</button>
			<button data-route="main">after login</button>
		</header>
		<main></main>
		`;
  }

  mounted() {}

  setEvent() {
    this.addEvent("click", "[data-route]", ({ target }) => {
      const newPath = "/" + target.dataset.route;
      history.pushState({}, "", newPath);
      router(); // 변경된 URL에 따라 컴포넌트 렌더링
    });
  }
}
