import Component from "../core/Component.js";
import Banner from "../components/Banner.js";

// 메인 게임 페이지
// export default class Main extends Component {
//   user;
//   setup() {
//     //get user api
//     //this is mockup data
//     this.user = {
//       userName: "username",
//       userId: "userid",
//       userNickname: "cutie-pie",
//       userLevel: 4.5,
//     };

//     this.setCss("Banner.css");
//   }
//   template() {
//     return `
//     <div id="main-container">
//       <div id="content-page"></div>
//       <div class="banner"></div>
//     </div>
//     `;
//   }
//   mounted() {
//     const $banner = this.$target.querySelector(".banner");
//     new Banner($banner, {});
//   }
// }

export const Main = () => {
	return `
	<div id="main-container">
	<div id="content-page"></div>
	<div class="banner"></div>
  </div>
  `
}