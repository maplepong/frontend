/* @jsx myReact.createElement */
import myReact , { Link } from "../core/myReact.js";
import Chat from "./Chat.js"
import api from "../core/Api_.js";
import UserStatus from "./UserStatus.js";

const Navbar = () => {
	return (<nav>
		<Chat></Chat>
		{/* <UserStatus username={localStorage.username}></UserStatus> */}
		<div id="btn-box">
			<div id="nav-btn-container">
			{/* <Link to="login"><button id="btn-nav-login">로그인</button></Link> */}
			{/* <Link to="api-login"><button id="btn-nav-42login">42로그인</button></Link> */}
			<div class="btn-class">
				<button id="btn-nav-logout" onclick={() => {api.logout()}}>로그아웃</button>
			</div>
			<div class="btn-class">
				<Link to="myinfo"><button class="btn-nav">정보</button></Link>
			</div>
			<div class="btn-class">
				<Link to="setting"><button class="btn-nav">설정</button></Link>
			</div>
			</div>
		</div>
	</nav>)
}

export default Navbar;