/* @jsx myReact.createElement */
import myReact , { Link } from "../core/myReact.js";
import { useState } from "../core/myReact.js";
import FriendList from "./FriendList.js";
import ChooseGame from "./ChooseGame.js";
import Modal from "./Modal.js";
import "../css/home.css"
import UserInfo from "./UserInfo.js";
import UserStatus from "./UserStatus.js";

const Home = () => {

	// const [modalVisible, setModalVisible] = useState(false);
    // const [modalContent, setModalContent] = useState(null);

	var friendNickname = "";
	const	[status, setStatus] = useState({nickname : "", class: "hidden"});
    const showModal = (nickname) => {
		setStatus({nickname, class: ""});
    };

    // const hideModal = () => {
    //     setModalVisible(false);
    //     setModalContent(null); // 모달 정보 초기화
    // };

	return <div id="home">
				{/* 아래 라인 주석 치면 에러안남 */}
				{/*<Modal content={modalContent} onClose={hideModal} /> && modalVisible */}
				<ChooseGame />
				<div id="myStatus">
					<UserStatus username={localStorage.username}></UserStatus>
					<FriendList callback={showModal}/>
				</div>
				{/* <UserInfo class={status.class} nickname={status.nickname}></UserInfo> */}
		</div>
}

export default Home;