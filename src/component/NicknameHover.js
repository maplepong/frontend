/* @jsx myReact.createElement */
import myReact, { Link } from "../core/myReact.js";
import "../css/NicknameHover.css"
import router from "../core/Router.js";

const NicknameHover = ({nickname}) => {
	var show = 0; //0 hidden 1 show;
	function showmenu (e) {
		const menu = e.target.closest(".nicknameContainer").getElementsByClassName("hovermenu");
		// const menu = document.querySelector(".hovermenu");
		console.log(menu)
		if (show) menu[0].classList.remove("hidden");
		else menu[0].classList.add("hidden");
		show = show ? 0 : 1; 
	}
	function hidemenu () {
		const menu = document.querySelectorAll(".hovermenu");
		menu.classList.add("hidden");
	}
	function routeToFriend() {
		router("/userinfo");
	}
	return <div class="nicknameContainer" id={nickname} onclick={showmenu} > 
		<p>{nickname}</p>
		<div class="hidden hovermenu">
			<ul>
				<li><span onclick={routeToFriend}>{nickname} 정보보기</span></li>
				<li>친구신청하기</li>
				<li>게임초대하기</li>
				<li>대화하기</li>
			</ul>
		</div>
	</div>
}

export default NicknameHover;