import Component from "../core/Component.js";

export default class Banner extends Component {
  setup() {
    this.setCss("Banner.css");
  }

  template() {
    return `
			<div class="chatroom"></div>
			<div class="user-status"></div>
			<div class="menu">
				<button data-route="gameroom">게임</button>
				<button data-route="user-info">정보</button>
				<button data-route="setting">설정</button>
			</div>
		`;
  }
}
