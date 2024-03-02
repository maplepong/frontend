import Component from "../core/Component.js";
import Banner from "../components/Banner.js";

export default class Main extends Component {
  user;
  setup() {
    //get user api
    //this is mockup data
    this.user = {
      userName: "username",
      userId: "userid",
      userNickname: "cutie-pie",
      userLevel: 4.5,
    };
  }
  template() {
    return `
		<div id="content-page"></div>
		<div class="banner"></div>
		`;
  }
  mounted() {
    const $banner = this.$target.querySelector(".banner");
    new Banner($banner, {});
  }
}

