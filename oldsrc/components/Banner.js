import Component from "../core/Component.js";
import WidgetUserInfo from "../components/WidgetUserInfo.js";

export default class Banner extends Component {
  setup() {
    this.setCss("Banner.css");
	if (this.props.user === undefined )
		alert("user is not set");
  }

  template() {
    return `
			<div class="chatroom"></div>
			<div class="user-status"></div>
			<div class="menu">
				<div data-route="gameroom">게임</button>
				<div id="user-info" data-route="user-info">정보</button>
				<div data-route="setting">설정</button>
			</div>
		`;
  }
  mounted () {
	const $userInfo = this.$target.querySelector("#user-info");
	new WidgetUserInfo($userInfo, {user: this.props.user});
  }
}

