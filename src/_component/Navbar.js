/* @jsx createElement */
import {createElement, Link } from "../core/myReact.js";
import Chat from "./Chat.js"
import UserStatus from "./UserStatus.js";
import "../css/Navbar.css"

const Navbar = () => {
	return (<nav>
		<Chat></Chat>
		<UserStatus username={localStorage.username}></UserStatus>
		<div id="nav-btn-container">
		<Link to="/gameroom"><button id="btn-nav-game">게임</button></Link>
		<Link to="/myinfo"><button id="btn-nav-info">정보</button></Link>
		<Link to="/setting"><button id="btn-nav-setting">설정</button></Link>
		</div>
	</nav>
	)
}

export default Navbar;