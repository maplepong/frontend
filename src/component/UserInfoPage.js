/* @jsx myReact.createElement */
import myReact from "../core/myReact.js"
import UserInfo from "./UserInfo.js"
import "../css/MyInfo.css"

const UserInfoPage = (nickname) => {
	return (
		<div>
			<UserInfo nickname={nickname} />
		</div>
	)
}

export default UserInfoPage;