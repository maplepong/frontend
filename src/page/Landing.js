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
  
    this.setCss("index.css");
  }
  template() {
    return `
		<div id="Landing" data-route="login">
      <div id="Entrance">  
        <img src="./src/asset/background/board.png" id="Board">
        <span id="loginBtn" data-route="login">로그인</span>
      </div>
    </div>
		`;
  }
  mounted() {}
}

