import Component from "../core/Component.js";

export default class Landing extends Component {
  setup() {
    // Create a link element
    var cssLink = document.createElement("link");

    // Set the attributes
    cssLink.href = "src/css/landing.css";
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    cssLink.id = "dynamic-link";

    // Append it to the head
    document.head.appendChild(cssLink);
  }
  template() {
    return `
		<div data-route="login">로그인
		</div>
		`;
  }
  mounted() {

  }
}

