/* @jsx myReact.createElement */
import myReact, { Link } from "../core/myReact.js";
import "../css/NicknameHover.css"

const NicknameHover = ({nickname}) => {
	const data = {
		nickname: nickname,
	}
	var show = 0; //0 hidden 1 show;
	function showmenu (e) {
		const menu = e.target.closest(".nicknameContainer").getElementsByClassName("hovermenu");
		console.log(menu)
		if (show) menu[0].classList.remove("hidden");
		else menu[0].classList.add("hidden");
		show = show ? 0 : 1; 
	}
	function routeToFriend(nickname) {
		myReact.redirect("userinfo/"+nickname);
	}
	return <div class="nicknameContainer" id={nickname} onclick={showmenu} > 
		<p>{nickname}</p>
		<div class="hidden hovermenu">
			<ul>
				<li><span onclick={()=>{ (routeToFriend(nickname))}}>{nickname} 정보보기</span></li>
				<li>친구신청하기</li>
				<li>게임초대하기</li>
				<li>대화하기</li>
			</ul>
		</div>
	</div>
}

export default NicknameHover;